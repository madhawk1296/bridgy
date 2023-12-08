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

export default function Providers({ children, session }: { children: ReactNode, session: any}) {
  
    return (
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
    )
}