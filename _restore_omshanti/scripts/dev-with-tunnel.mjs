import { spawn } from 'node:child_process';
import process from 'node:process';

function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function npxCommand() {
  return process.platform === 'win32' ? 'npx.cmd' : 'npx';
}

function startProcess(command, args, options = {}) {
  if (process.platform === 'win32') {
    return spawn('cmd.exe', ['/d', '/s', '/c', command, ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
      ...options,
    });
  }

  return spawn(command, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    ...options,
  });
}

function prefixOutput(stream, prefix, onLine) {
  let buffer = '';
  stream.on('data', (chunk) => {
    buffer += chunk.toString('utf8');
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }
      console.log(`${prefix} ${line}`);
      if (onLine) {
        onLine(line);
      }
    }
  });
}

function killProcess(child) {
  if (!child || child.killed) {
    return;
  }

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/t', '/f']);
      return;
    }
    child.kill('SIGTERM');
  } catch {
    // no-op
  }
}

const tunnelPort = process.env.TUNNEL_PORT || '5173';
const requestedSubdomain = (process.env.LT_SUBDOMAIN || '').trim();

const devEnv = {
  ...process.env,
  PAYPAL_SKIP_WEBHOOK_SIGNATURE_VERIFY:
    process.env.PAYPAL_SKIP_WEBHOOK_SIGNATURE_VERIFY || 'true',
  PAYPAL_DEBUG_TOKEN: process.env.PAYPAL_DEBUG_TOKEN || 'smoke-test-token',
};

console.log('[setup] Starting Vite dev server and localtunnel...');
console.log(`[setup] Tunnel port: ${tunnelPort}`);
if (requestedSubdomain) {
  console.log(`[setup] Requested localtunnel subdomain: ${requestedSubdomain}`);
}

const dev = startProcess(npmCommand(), ['run', 'dev'], { env: devEnv });
const tunnelArgs = ['localtunnel', '--port', tunnelPort];
if (requestedSubdomain) {
  tunnelArgs.push('--subdomain', requestedSubdomain);
}
const tunnel = startProcess(npxCommand(), tunnelArgs, { env: process.env });

let shuttingDown = false;
let tunnelUrl = '';

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;

  console.log('[setup] Shutting down background processes...');
  killProcess(dev);
  killProcess(tunnel);
  setTimeout(() => process.exit(code), 250);
}

prefixOutput(dev.stdout, '[dev]');
prefixOutput(dev.stderr, '[dev]');

prefixOutput(tunnel.stdout, '[tunnel]', (line) => {
  const match = line.match(/your url is:\s*(https?:\/\/\S+)/i);
  if (!match) {
    return;
  }

  tunnelUrl = match[1];
  const webhookUrl = `${tunnelUrl}/api/paypal/webhook`;
  console.log(`[setup] Tunnel URL: ${tunnelUrl}`);
  console.log(`[setup] Webhook URL: ${webhookUrl}`);

  if (requestedSubdomain && !tunnelUrl.includes(`://${requestedSubdomain}.`)) {
    console.log('[setup] Requested subdomain was unavailable; localtunnel assigned a different URL.');
  }

  console.log('[setup] Update PayPal sandbox webhook URL if needed, then run smoke tests.');
});
prefixOutput(tunnel.stderr, '[tunnel]');

dev.on('exit', (code) => {
  if (shuttingDown) {
    return;
  }
  console.log(`[setup] Dev server exited with code ${code ?? 0}.`);
  shutdown(code ?? 1);
});

tunnel.on('exit', (code) => {
  if (shuttingDown) {
    return;
  }
  console.log(`[setup] Tunnel process exited with code ${code ?? 0}.`);
  if (!tunnelUrl) {
    console.log('[setup] Tunnel URL was not established.');
  }
  shutdown(code ?? 1);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
