import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReWear',
  description: 'Community Clothing Exchange Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
