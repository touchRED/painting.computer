import { PrismicPreview } from '@prismicio/next'
import { Inter } from 'next/font/google'
import { repositoryName } from '@/prismicio'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'painting.computer',
  description: 'ai assisted artwork',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
