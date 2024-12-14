import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/providers/tanstackQueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Langkah Teman Kamu",
    template: "%s - Langkah Teman Kamu",
  },
  description:
    "We are founded to be initiator in creating real contributions in increasing understanding and awareness of the global community.",
  icons: {
    icon: [
      {
        url: "/main/favicon/favicon.ico",
        href: "/main/favicon/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-Montserrat`}>
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
        <Toaster />
      </body>
    </html>
  );
}
