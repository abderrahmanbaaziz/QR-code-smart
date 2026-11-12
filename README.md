# QR Code Smart

A minimal Next.js app that keeps one permanent QR code while routing mobile visitors to the correct app store.

## How it works

- `/` generates a QR code for this site's `/download` URL.
- `/download` reads the HTTP `User-Agent` on the server.
- iPhone and iPad requests receive an uncached HTTP 302 redirect to the App Store.
- Android requests receive an uncached HTTP 302 redirect to Google Play.
- Desktop and unknown devices receive a small page with both store links.

Because the QR code points to `/download` instead of a store, the store URLs can change without replacing the QR code.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

```ini
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/dz/app/beesiha-patient/id6744827218
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=io.beesolution.beesiha_patient
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```

`NEXT_PUBLIC_BASE_URL` should be the public Vercel origin with no path. When it is missing, the homepage derives the origin from the incoming request headers.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Add the three environment variables above in **Project Settings → Environment Variables**.
3. Deploy. Vercel detects Next.js automatically; no custom build settings are needed.

To change a store link later, update the matching environment variable and redeploy. The printed QR code remains valid.
