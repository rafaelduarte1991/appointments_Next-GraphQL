import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Appointments App',
  description: 'Appointment Scheduling App with Customer Database Integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, sans-serif' }} className="bg-zinc-100 text-zinc-800 my-5">{children}</body>
    </html>
  )
}
