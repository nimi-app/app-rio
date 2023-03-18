import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { Content, Header, HeaderEyebrow, PageWrapper } from './styled';
import { ReactComponent as EthereumRioLogo } from '../../assets/images/ethereum-rio-big.svg';
import RioBackground from '../../assets/images/rio-background.jpg';
import { RainbowConnectButton } from '../../components/Button/ConnectButton';
import { Footer } from '../../components/Footer';
import { SearchInputSelect } from '../../components/Input/SearchInput';

import '@rainbow-me/rainbowkit/styles.css';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);

  const onClaimHandler = () => {
    console.log('here');
  };

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
        {/* <RainbowConnectButton showAvatar={true} /> */}
        <StyledConnectButton chainStatus={'none'} accountStatus={'full'} showBalance={false} label="Connect Wallet" />
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
          isSearching={isSearching}
          isNameAvailable={false}
        />
        <RainbowConnectButton onClaimUsername={onClaimHandler} />
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

const StyledConnectButton = styled(ConnectButton)`
  font-family: ' Space Mono ' !important;
  div > * {
    font-family: 'Space Mono' !important;
  }
`;
