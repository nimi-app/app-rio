import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo-text.svg';
import { MEDIA_WIDTHS } from '../../theme';
import { Web3Status } from '../Web3Status';

export function Header() {
  return (
    <Container>
      <Content>
        <Link to="/domains/all">
          <NimiLogo width="100px" height="40px" />
        </Link>
        <Web3Status />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
`;
