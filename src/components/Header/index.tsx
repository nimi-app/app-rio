import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { ReactComponent as RioLogo } from '../../assets/images/ethereum-rio-big.svg';
import { HEADER_HEIGHT, MEDIA_WIDTHS } from '../../theme';

export function Header() {
  return (
    <Container>
      <HeaderStyle>
        <RioLogo />
        {/* <RainbowConnectButton showAvatar={true} /> */}
        <ConnectButton chainStatus={'none'} accountStatus={'full'} showBalance={false} label="Connect Wallet" />
      </HeaderStyle>
    </Container>
  );
}
export const HeaderStyle = styled.header`
  display: flex;
  margin-top: 24px;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  //select first child
  > *:first-child {
    margin-right: 544px;
  }

  @media (max-width: 1025px) {
    > *:first-child {
      margin-right: 0;
    }
    justify-content: space-between;
  }
`;

const Container = styled.header`
  width: 100%;
`;

const Content = styled.div`
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
`;
