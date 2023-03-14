import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Button } from '../Button';

export const RainbowConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected || chain.unsupported) {
                return (
                  <Button
                    onClick={() => {
                      if (!connected) openConnectModal();
                      else openChainModal();
                    }}
                  >
                    <span>Connect Wallet</span>
                  </Button>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
