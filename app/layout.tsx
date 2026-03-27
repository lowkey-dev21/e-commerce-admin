import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopEase Admin",
  description: "E-commerce Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="h-full flex bg-slate-100 text-slate-800 antialiased">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
