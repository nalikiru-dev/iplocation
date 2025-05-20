import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IpLocation',
  description: 'Tracks users location and some info from ip adress',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
