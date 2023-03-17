import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Button } from '../Button';

export const RainbowConnectButton = ({ onClaimUsername }) => {
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
              } else {
                return <Button onClick={onClaimUsername}>Claim Username</Button>;
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

// export interface WrapperProps {
//   isError: boolean;
// }
// const StyledWrapper = styled(StyledButtonBaseFrame)<WrapperProps>(
//   ({ isError }) => `
//   display: flex;
//   // height: 48px;
//   // width: 200px;
//   padding:6px 8px;
//   background: #FFFFFF;
//   color:#25292E;
//   align-items: center;
//   ${isError ? 'background: #EB5757;' : ''}
//   `
// );
// const StyledInnerWrapper = styled.div`
//   display: flex;
//   padding: 0px 2px 0px 8px;
//   justify-content: center;
// `;

// const StyledTextContent = styled.span`
//   max-width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;
