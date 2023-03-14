import { styled } from 'styled-components';

import { ReactComponent as NimiEnsLogo } from '../../assets/svg/ens-nimi-logo.svg';
import { FOOTER_HEIGHT, MEDIA_WIDTHS } from '../../theme';

export function Footer() {
  return (
    <Container>
      <Content>
        <Paragraph>Powered by</Paragraph>
        <NimiEnsLogo />
      </Content>
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
  margin-bottom: 60px;
`;

const Content = styled.div`
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  width: 100%;
  height: ${FOOTER_HEIGHT};
  display: flex;

  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
  flex-direction: column;
`;

const Paragraph = styled.p`
  display: inline-block;
  line-height: 24px;
  text-align: left;
  color: #9f84ff;
  margin-bottom: 16px;
`;

const Navigation = styled.nav`
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
