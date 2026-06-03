import { spawn } from 'node:child_process';
import process from 'node:process';

function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function spawnCommand(command, args, options = {}) {
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

let shuttingDown = false;
let activeSmoke = null;
let lastSmokeUrl = '';

const devTunnel = spawnCommand(npmCommand(), ['run', 'dev:tunnel'], {
  env: process.env,
});

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;

  if (activeSmoke) {
    killProcess(activeSmoke);
  }

  killProcess(devTunnel);
  setTimeout(() => process.exit(code), 250);
}

async function runSmoke(baseUrl) {
  if (activeSmoke) {
    console.log('[smoke:auto] Smoke already running; skipping new trigger.');
    return;
  }

  const smokeEnv = {
    ...process.env,
    TUNNEL_BASE_URL: baseUrl,
  };

  console.log(`[smoke:auto] Running smoke:webhook against ${baseUrl}`);
  const smoke = spawnCommand(npmCommand(), ['run', 'smoke:webhook'], {
    env: smokeEnv,
  });
  activeSmoke = smoke;

  prefixOutput(smoke.stdout, '[smoke:auto]');
  prefixOutput(smoke.stderr, '[smoke:auto]');

  smoke.on('exit', (code) => {
    activeSmoke = null;
    if (code === 0) {
      console.log('[smoke:auto] Smoke verification passed.');
      return;
    }
    console.log(`[smoke:auto] Smoke verification failed with code ${code ?? 1}.`);
  });
}

prefixOutput(devTunnel.stdout, '[dev:tunnel]', (line) => {
  const match = line.match(/\[setup\] Tunnel URL:\s*(https?:\/\/\S+)/i);
  if (!match) {
    return;
  }

  const tunnelUrl = match[1].replace(/\/+$/, '');
  if (tunnelUrl === lastSmokeUrl) {
    return;
  }

  lastSmokeUrl = tunnelUrl;
  void runSmoke(tunnelUrl);
});

prefixOutput(devTunnel.stderr, '[dev:tunnel]');

devTunnel.on('exit', (code) => {
  if (shuttingDown) {
    return;
  }

  console.log(`[dev:tunnel] Process exited with code ${code ?? 0}.`);
  shutdown(code ?? 1);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
