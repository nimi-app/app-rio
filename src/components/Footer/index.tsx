import { styled } from 'styled-components';

import BrasilPng from '../../assets/rio/brasilFooter.png';
import { ReactComponent as Ens } from '../../assets/rio/ensFooter.svg';
import NimiPng from '../../assets/rio/nimiFooter.png';
import { FOOTER_HEIGHT, MEDIA_WIDTHS } from '../../theme';

enum LinkType {
  NIMI,
  ENS,
  BRASIL,
}

export function Footer() {
  const handleImageClick = (link: LinkType) => {
    switch (link) {
      case LinkType.NIMI:
        window.open('https://www.nimi.io/', '_blank');
        break;
      case LinkType.ENS:
        window.open('https://ens.domains/', '_blank');
        break;
      case LinkType.BRASIL:
        window.open('https://www.ethereumbrasil.com/', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Content>
        <Paragraph>Powered by</Paragraph>
        <SponsorWrapper>
          <StyledNimi onClick={() => handleImageClick(LinkType.NIMI)}>
            <img src={NimiPng} />
          </StyledNimi>
          <StyledBrasil onClick={() => handleImageClick(LinkType.BRASIL)}>
            <img src={BrasilPng} />
          </StyledBrasil>

          <Ens onClick={() => handleImageClick(LinkType.ENS)} />
        </SponsorWrapper>
      </Content>
    </Container>
  );
}

const StyledNimi = styled.div`
  width: 100px;
  height: 27px;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 500px) {
    width: 88px;
    height: 24px;
  }
`;
const StyledBrasil = styled.div`
  width: 155px;
  height: 40px;
  @media (max-width: 500px) {
    width: 135px;
    height: 35px;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const SponsorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 29px;
  cursor: pointer;
`;
const Container = styled.footer`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 91px;
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
  font-family: 'Space Mono';
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.06em;
`;
