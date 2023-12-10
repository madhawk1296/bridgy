'use client'

import { ReactNode } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import SubscribeModal from "./SubscribeModal";
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'


const { chains, publicClient } = configureChains(
    [arbitrum],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'Bridgeworld Help',
    projectId: '953d814f70f02d82ecdb051c082c52e6',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
  }

export default function Providers({ children, session }: { children: ReactNode, session: any}) {
  
    return (
      <PostHogProvider client={posthog}>
        <WagmiConfig config={wagmiConfig}>
          <SessionProvider refetchInterval={0} session={session}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider chains={chains}>
                <SubscribeModal>
                  {children}
                </SubscribeModal>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </WagmiConfig>
      </PostHogProvider>
    )
}