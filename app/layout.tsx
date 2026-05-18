import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pratishesh Associate & Consultancy | Business Solutions',
  description:
    'Empowering Businesses with Professional Consultancy, Legal Compliance, HR Solutions, Web Development, Industrial Training & Job Placement Services.',
  keywords: [
    'Pratishesh',
    'Business Consultancy',
    'Legal Compliance',
    'Web Development',
    'Industrial Training',
    'Job Placement',
    'Lucknow',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
