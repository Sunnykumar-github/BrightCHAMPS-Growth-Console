import React from "react";
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";
import DataLoader from "@/components/DataLoader";

const Source_Serif_4_var = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
});

const IBM_Plex_Sans_var = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <title>BrightChamps Console</title>
      <link rel="icon" href="https://brightchamps.com/favicon.ico" /></head>
      <body className={`${Source_Serif_4_var.variable} ${IBM_Plex_Sans_var.variable} bg-surface`}>
        <DataLoader />
        <div className="flex w-full min-h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto w-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
