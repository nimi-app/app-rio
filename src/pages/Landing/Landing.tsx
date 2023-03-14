import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Content, Header, HeaderEyebrow, HeroLead, HeroText, PageWrapper } from './styled';
import { ReactComponent as EthereumRioLogo } from '../../assets/images/ethereum-rio-big.svg';
import { RainbowConnectButton } from '../../components/Button/ConnectButton';
import { Footer } from '../../components/Footer';
import { SearchInputSelect } from '../../components/Input/SearchInput';

import '@rainbow-me/rainbowkit/styles.css';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);

  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleShit = () => {
    console.log('shti');
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('sheat');
  };
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextSearchQuery = e.target.value.trim();
    setSearchValue(nextSearchQuery);
    setIsSearching(nextSearchQuery.length > 0);
  }, []);
  const handleOnBlur = useCallback(() => {
    setIsSearching(false);
  }, []);

  return (
    <PageWrapper>
      <Header>
        <EthereumRioLogo />
        <RainbowConnectButton />
      </Header>
      <Content>
        <HeaderEyebrow>
          Claim your <br />
          Ethereum.Rio Identity
        </HeaderEyebrow>
        <HeaderSubText>
          Your identity across web3, one name for all your crypto addresses, and your decentralised website.
        </HeaderSubText>
        <SearchInputSelect
          handleKeyDown={handleOnKeyDown}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          handleOnFocus={handleShit}
          value={searchValue}
          isTooShort={true}
          isSearching={isSearching}
          isNameAvailable={undefined}
        />
        <RainbowConnectButton />
      </Content>
      <Footer />
    </PageWrapper>
  );
}

const HeaderSubText = styled.div`
  font-weight: 400;
  font-size: 17px;
  margin: 0 52px;
  max-width: 526px;
  @media (max-width: 725px) {
    margin: 0;
  }
`;
