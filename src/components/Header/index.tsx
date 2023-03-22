import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ReactComponent as RioLogo } from '../../assets/images/ethereum-rio-big.svg';
import { HEADER_HEIGHT, MEDIA_WIDTHS } from '../../theme';

export function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderStyle>
        <HeaderLogo onClick={() => navigate('/')} />
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
  justify-content: space-between;
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

const HeaderLogo = styled(RioLogo)`
  cursor: pointer;
`;

const Container = styled.header`
  width: 100%;
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0;
  margin: 0 auto;
  margin-bottom: 62px;
  padding: 0 20px;
`;

const Content = styled.div``;
