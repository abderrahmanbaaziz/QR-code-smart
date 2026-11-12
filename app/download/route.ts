import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_APP_STORE_URL = "https://apps.apple.com/dz/app/beesiha-patient/id6744827218";
const DEFAULT_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=io.beesolution.beesiha_patient";

function storeUrl(value: string | undefined, fallback: string) {
  try {
    const url = new URL(value ?? fallback);
    return url.protocol === "https:" ? url : new URL(fallback);
  } catch {
    return new URL(fallback);
  }
}

function noCache(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, no-cache, max-age=0, must-revalidate");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("Vary", "User-Agent");
  return response;
}

export function GET(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const appStoreUrl = storeUrl(process.env.NEXT_PUBLIC_APP_STORE_URL, DEFAULT_APP_STORE_URL);
  const playStoreUrl = storeUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL, DEFAULT_PLAY_STORE_URL);

  const isIOS = /iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && /Mobile/i.test(userAgent));
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    return noCache(NextResponse.redirect(appStoreUrl, 302));
  }

  if (isAndroid) {
    return noCache(NextResponse.redirect(playStoreUrl, 302));
  }

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Download Beesiha Patient</title>
  <style>
    *{box-sizing:border-box}body{min-height:100vh;margin:0;display:grid;place-items:center;padding:24px;background:#f7f8fa;color:#15171a;font-family:Arial,Helvetica,sans-serif}.card{width:min(100%,420px);padding:36px;border:1px solid #e3e6ea;border-radius:20px;background:#fff;text-align:center;box-shadow:0 12px 40px rgb(20 30 50/8%)}h1{margin:0 0 10px;font-size:2rem}p{margin:0 0 28px;color:#5d6470;line-height:1.5}.links{display:grid;gap:12px}a{display:block;padding:14px 18px;border-radius:10px;background:#15171a;color:#fff;text-decoration:none;font-weight:700}a:focus-visible{outline:3px solid #5b8def;outline-offset:3px}
  </style>
</head>
<body>
  <main class="card">
    <h1>Download Beesiha Patient</h1>
    <p>Choose your device to continue.</p>
    <div class="links">
      <a href="${appStoreUrl.toString()}">Download for iOS</a>
      <a href="${playStoreUrl.toString()}">Download for Android</a>
    </div>
  </main>
</body>
</html>`;

  return noCache(
    new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }),
  );
}
