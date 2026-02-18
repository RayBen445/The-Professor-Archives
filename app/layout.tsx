import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Professor\'s Archives | Uncovered History',
  description: 'Global events. African perspectives. Explained vividly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
