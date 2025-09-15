import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jvectormap-next/jquery-jvectormap.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | Sarvesh Xeno Store",
    default: "Sarvesh Xeno Store",
  },
  description: "This is Shopify Analytics Dashboard.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
