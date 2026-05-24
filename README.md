# OmShantiDirectory

OmShantiDirectory is a Vite + React application for guided spiritual learning. It combines a searchable directory experience with sequential module progression, persistent audio playback, protocol forms, and cinematic looping video backdrops.

## What the app does

- Presents a structured library of 25 guided modules built from 100 concept screens.
- Gates full access behind a one-time PayPal membership flow.
- Validates membership against a server-issued, signed session cookie.
- Persists per-module progression in `sessionStorage` using keys such as `omShantiModule1Step` through `omShantiModule25Step`.
- Keeps background audio available globally through a shared audio context.
- Uses video backdrops from `public/videos` for the immersive module experience.

## Stack

- React 19
- Vite 8
- Tailwind utility styling
- Lucide React icons
- Framer Motion
- Git LFS for `public/videos/*.mp4`

## Getting started

### Prerequisites

- Node.js 20+
- npm
- Git LFS installed if you are cloning the repository and need the video assets

### Install

```bash
npm install
git lfs pull
```

Create a local env file before using the payment flow:

```bash
copy .env.example .env.local
```

Then set these values in `.env.local`:

```env
VITE_PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET
PAYPAL_ENV=sandbox
MEMBERSHIP_SESSION_SECRET=SET_A_LONG_RANDOM_SECRET
PAYPAL_WEBHOOK_ID=YOUR_PAYPAL_WEBHOOK_ID
PAYMENTS_STORE_FILE=.payments-store.json
```

### Run locally

```bash
npm run dev
```

The Vite dev server starts on the local URL shown in the terminal, typically `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Core architecture

- `src/main.jsx` mounts the app inside `AudioProvider` so playback state can persist across the experience.
- `src/App.jsx` contains the main state machine for directory navigation, module progression, lazy-loaded concepts, and membership gating.
- `src/components/MinimalAudioPlayer.jsx` maps the active module to its audio and video assets.
- `src/PaymentGate.jsx` handles the PayPal purchase flow and unlocks access after server-verified capture.
- `src/lib/akashicLedger.js` stores module metadata and completion synchronization behavior.
- `api/paypal/create-order.js` and `api/paypal/capture-order.js` create/capture PayPal orders on the server.
- `api/paypal/webhook.js` ingests PayPal webhook events and updates stored payment records.
- `api/membership/session.js` returns current server session status from the signed cookie.

## Media and repository notes

- Video files in `public/videos` are tracked with Git LFS.
- Audio files in `public/audio` remain in normal Git.
- The repository is scoped to the Vite app; sibling experimental apps in the workspace are intentionally ignored.

## Payment caveat

The PayPal flow now creates and captures orders on the server side. The browser only loads the PayPal SDK and receives the verified order result after the backend capture succeeds. Membership access is derived from a signed, HttpOnly session cookie.

Local development serves the PayPal API and membership routes through Vite middleware. Production needs a host that serves the `api/` functions, such as Vercel.

Before treating this as a production payment system, add:

- persistent purchase records in a managed database
- webhook signature enforcement with `PAYPAL_WEBHOOK_ID`
- membership recovery or account binding
- operational refund and support workflows

Additional PayPal notes are in `PAYPAL_SETUP.md`.

## Project shape

- `src/Concept*.jsx`: concept screens
- `src/components/*ProtocolForm.jsx`: module-specific protocol forms
- `src/context/AudioContext.jsx`: persistent playback state
- `public/audio`: guided audio assets
- `public/videos`: looping backdrop videos

## Current status

The repo has already been cleaned for publishing, large video assets are managed with Git LFS, and the app has been validated with a successful Vite production build.
