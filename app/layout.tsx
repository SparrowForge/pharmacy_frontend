import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'PharmaSmart - AI-Powered Pharmacy Management System',
  description: 'Manage inventory, sales, prescriptions, and delivery with our intelligent SaaS platform designed for modern pharmacies.',
  keywords: ['pharmacy management', 'POS system', 'inventory management', 'prescription OCR', 'AI pharmacy', 'SaaS'],
  authors: [{ name: 'PharmaSmart' }],
  openGraph: {
    title: 'PharmaSmart - AI-Powered Pharmacy Management',
    description: 'The complete pharmacy management solution with AI-powered insights.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4ade80',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} bg-background`}>
      <body className="font-sans antialiased bg-gradient-to-br from-background via-background to-primary/5 animate-gradient-flow min-h-screen">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
