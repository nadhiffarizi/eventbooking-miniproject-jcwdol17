import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SessionComponent from "@/components/hoc/SessionProvider.component";

export const metadata: Metadata = {
  title: "Vitae",
  description: "event booking marketplace",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <SessionComponent>{children}</SessionComponent>
      </body>
    </html>
  );
}
