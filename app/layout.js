import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'
import './globals.css'

export const metadata = {
  title: 'painting.computer',
  description: 'ai assisted artwork',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
