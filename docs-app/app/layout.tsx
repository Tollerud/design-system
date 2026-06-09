import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tollerud UI',
  description: 'Dark, monochrome design system with yellow accent.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  )
}
