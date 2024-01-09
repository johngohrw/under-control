import "../styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import Providers from "./providers";
import { cn } from "@/lib/utils";

export const metadata = {
  metadataBase: new URL("https://under-control-expenses-tracker.vercel.app"),
  title: "Under Control",
  description: "Description for Under Control",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased h-full",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
