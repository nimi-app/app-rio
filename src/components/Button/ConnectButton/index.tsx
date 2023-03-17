import { ConnectButton } from '@rainbow-me/rainbowkit';
import { styled } from 'styled-components';

import { ReactComponent as ArrowDown } from '../../../assets/svg/arrow-down.svg';
import { Web3Avatar } from '../../Web3Avatar/Web3Avatar';
import { Button } from '../Button';
import { StyledButtonBaseFrame } from '../styled';

export const RainbowConnectButton = ({ showAvatar = false }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, openAccountModal, authenticationStatus, mounted }) => {
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
              } else if (showAvatar) {
                return (
                  <StyledWrapper as="button" isError={false} onClick={openAccountModal}>
                    <Web3Avatar url={account.ensAvatar} alt={account.displayName} />
                    <StyledInnerWrapper>
                      <StyledTextContent>{account.displayName}</StyledTextContent>
                    </StyledInnerWrapper>
                    <ArrowDown />
                  </StyledWrapper>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export interface WrapperProps {
  isError: boolean;
}
const StyledWrapper = styled(StyledButtonBaseFrame)<WrapperProps>(
  ({ isError }) => `
  display: flex;
  // height: 48px;
  // width: 200px;
  padding:6px 8px;
  background: #FFFFFF;
  color:#25292E;
  align-items: center;
  ${isError ? 'background: #EB5757;' : ''}
  `
);
const StyledInnerWrapper = styled.div`
  display: flex;
  padding: 0px 2px 0px 8px;
  justify-content: center;
`;

const StyledTextContent = styled.span`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
