'use client'

import { ReactNode } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import SubscribeModal from "./SubscribeModal";

const { chains, publicClient } = configureChains(
    [arbitrumSepolia],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'Bridgeworld Helper',
    projectId: '953d814f70f02d82ecdb051c082c52e6',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

export default function Providers({ children }: { children: ReactNode}) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
              <SubscribeModal>
                {children}
              </SubscribeModal>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}