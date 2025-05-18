import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Plant Disease Detector',
  description: 'Upload a plant leaf image to detect diseases',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-nature-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
} 