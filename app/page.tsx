import { headers } from "next/headers";
import { DownloadQrCode } from "./qr-code";

export const dynamic = "force-dynamic";

function configuredBaseUrl() {
  const value = process.env.NEXT_PUBLIC_BASE_URL;

  if (!value || value.includes("PASTE_") || value.includes("your-project")) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export default async function Home() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = configuredBaseUrl() ?? `${protocol}://${host}`;
  const downloadUrl = new URL("/download", baseUrl).toString();

  return (
    <main>
      <section className="card">
        <h1>Download Beesiha Patient</h1>
        <p>Scan with your phone to open the correct app store.</p>
        <DownloadQrCode value={downloadUrl} />
        <p className="url">{downloadUrl}</p>
      </section>
    </main>
  );
}
