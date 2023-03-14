import { styled } from 'styled-components';

import backgroundImageUrl from '../../assets/images/nimi-header-background.jpeg';
import { NimiSignatureColor } from '../../theme';

export const PageWrapper = styled.div`
  display: flex;
  /* background-image: url('${backgroundImageUrl}'); */
  background-color: #e5e5e5;
  background-position: center;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
`;

export const Header = styled.header`
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
  justify-content: center;
  text-align: center;
`;

export const HeroText = styled.div`
  ${NimiSignatureColor};
  font-size: 72px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size:42px;
  `};
  align-items: center;
  margin-bottom: 32px;
  justify-content: start;
  > * {
    -webkit-text-fill-color: transparent;
  }
`;

export const HeroLead = styled.div`
  font-weight: 400;
  line-height: 93.06px;
`;

export const HeroSub = styled.div`
  font-weight: 600;
`;
export const HeaderEyebrow = styled.div`
  font-weight: 700;
  font-size: 54px;
  line-height: 117.7%;
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #5625ff;
  line-height: 72px;
  /* or 133% */

  text-align: center;
  letter-spacing: -0.06em;
  @media (max-width: 725px) {
    font-size: 36px;
    line-height: 53px;
  }
`;
