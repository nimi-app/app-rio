import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { PropsWithChildren } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { rainbowWeb3AuthConnector } from './Web3Auth';
import { SUPPORT_CHAINS_RAINBOW_KIT } from '../../constants';

if (!process.env.REACT_APP_ALCHEMY_API_KEY) {
  throw new Error('Missing REACT_APP_ALCHEMY_API_KEY env var');
}

export const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY as string }),
  publicProvider(),
]);

const wallets = [rainbowWeb3AuthConnector({ chains }) as any];

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets,
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
