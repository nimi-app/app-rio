import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Content, HeaderEyebrow, PageWrapper } from './styled';
import { useNimiIdAvalibility } from '../../api/RestAPI/hooks/useNimiIdAvalibility';
import { Button } from '../../components/Button';
import { RainbowConnectButton } from '../../components/Button/ConnectButton';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SearchInputSelect } from '../../components/Input/SearchInput';

import '@rainbow-me/rainbowkit/styles.css';

export const RIO_SUFIX = 'ethbr.co';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  const { data: isNameAvaliable, isLoading } = useNimiIdAvalibility(searchValue);

  console.log(isNameAvaliable, 'isNameThere');
  console.log('isLoading', isLoading);

  const onClaimHandler = () => {
    navigate(`domains/${searchValue}.${RIO_SUFIX}`);
  };

  const handleShit = () => {
    console.log('shti');
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('sheat');
  };
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextSearchQuery = e.target.value.trim();
    const regex = /^[a-zA-Z]+$/;
    if (nextSearchQuery === '' || regex.test(nextSearchQuery)) {
      setSearchValue(nextSearchQuery);
    }
  }, []);
  const handleOnBlur = useCallback(() => {
    console.log('onBlur');
  }, []);

  return (
    <PageWrapper>
      <Header />
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
          isSearching={isLoading}
          isNameAvailable={isNameAvaliable}
        />

        <RainbowConnectButton>
          <Button onClick={onClaimHandler} disabled={!isNameAvaliable}>
            Claim username
          </Button>
        </RainbowConnectButton>
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
