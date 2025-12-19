import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/organisms/header";
import { QueryProvider } from "@/components/providers/query-provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rick & Morty Dashboard",
  description: "Senior Software Engineer - Frontend Challenge",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden font-sans">
            <Header />
            <main className="container mx-auto flex w-full flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-6 sm:py-8">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
