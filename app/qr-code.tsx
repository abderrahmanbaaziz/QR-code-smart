"use client";

import { QRCodeSVG } from "qrcode.react";

export function DownloadQrCode({ value }: { value: string }) {
  return (
    <div className="qr" aria-label="QR code for the app download page">
      <QRCodeSVG value={value} size={220} level="M" marginSize={0} />
    </div>
  );
}
