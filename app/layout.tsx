import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import ScrollContext from "../components/scroll-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Misogi AI - Discover Exceptional Students",
  description:
    "A comprehensive platform for recruiters to discover and connect with talented students from Misogi AI",
  generator: "Pranav Nair",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        {" "}
        {/* Changed from font-mono to font-sans for professional look */}
        <ScrollContext>
          <Suspense fallback={null}>{children}</Suspense>
        </ScrollContext>
        <Analytics />
      </body>
    </html>
  )
}
