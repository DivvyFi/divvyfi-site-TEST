import { Inter } from 'next/font/google'
import './globals.css'
import Aoscompo from '@/lib/utils/aos'
import ScrollToTop from './components/scroll-to-top'
import Header from './components/layout/header'
import Footer from './components/layout/footer'

const font = Inter({ subsets: ['latin'] })

// ✅ Add metadata at the top-level
export const metadata = {
  title: 'DivvyFi | Own Real Assets. Keep Your Crypto.',
  description:
    'DivvyFi lets you co-own income-producing real assets like planes, yachts, and properties — powered by stablecoins and blockchain-backed contracts.',
  icons: {
    icon: '/favicon.ico', // ✅ Put favicon.ico in the /public folder
  },
  openGraph: {
    title: 'DivvyFi | Own Real Assets. Keep Your Crypto.',
    description:
      'Own and earn from tokenized real-world assets — secured by blockchain, not banks.',
    url: 'https://divvyfi.com',
    siteName: 'DivvyFi',
    images: [
      {
        url: '/images/meta/divvyfi-preview.png',
        width: 1200,
        height: 630,
        alt: 'DivvyFi Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={font.className}>
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
      </body>
    </html>
  )
}

