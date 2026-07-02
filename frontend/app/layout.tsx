import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Healthcare System",
  description: "AI Healthcare Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
       <ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
  <Toaster position="top-right" />

  <div className="flex flex-col min-h-screen">

    <Navbar />

    <main className="flex-1">
      {children}
    </main>

    <Footer />

  </div>

</ThemeProvider>
      </body>
    </html>
  );
}