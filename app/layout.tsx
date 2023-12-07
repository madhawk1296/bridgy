import type { Metadata } from 'next'
import './globals.css'
import BridgeworldHelper from '@/components/logos/BridgeworldHelper'
import rubik from '../fonts/rubik'
import Providers from './Providers'
import Wallet from './Wallet'
import Header from './Header'

export const metadata: Metadata = {
  title: 'Bridgeworld Help',
  description: 'Everything you need to navigate Bridgeworld and help you earn $MAGIC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='relative w-screen h-screen overflow-x-hidden overflow-y-scroll' lang="en">
        <body className={`relative w-screen h-screen overflow-x-hidden overflow-y-scroll ${rubik.medium} pb-[80px] md:pb-0`}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
    </html>
  )
}
