import type { Metadata } from 'next'
import './globals.css'
import BridgeworldHelper from '@/components/logos/BridgeworldHelper'
import rubik from '../fonts/rubik'
import Providers from './Providers'
import Wallet from './Wallet'
import Header from './Header'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/tools/auth'

export const metadata: Metadata = {
  title: 'Bridgeworld Help',
  description: 'Everything you need to navigate Bridgeworld and help you earn $MAGIC',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className='relative w-screen h-screen overflow-x-hidden overflow-y-scroll' lang="en">
        <body className={`relative w-screen h-screen overflow-x-hidden overflow-y-scroll ${rubik.medium} pb-[80px] md:pb-0`}>
          <Providers session={session}>
            <Header />
            {children}
          </Providers>
        </body>
    </html>
  )
}
