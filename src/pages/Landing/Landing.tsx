import { signMessage } from '@wagmi/core';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Content, HeaderEyebrow, PageWrapper } from './styled';
import { useNimiIdAvalibility } from '../../api/RestAPI/hooks/useNimiIdAvalibility';
import { useRegisterNimiId } from '../../api/RestAPI/hooks/useRegisterNimiId';
import { Button } from '../../components/Button';
import { RainbowConnectButton } from '../../components/Button/ConnectButton';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SearchInputSelect } from '../../components/Input/SearchInput';
import '@rainbow-me/rainbowkit/styles.css';
import { Spinner } from '../../components/Spinner';
import { useRainbow } from '../../hooks/useRainbow';
import { useUserInterface } from '../../services/useUserInterface';

export const RIO_SUFIX = 'ethbr.co';

export function Landing() {
  const navigate = useNavigate();
  const { account } = useRainbow();

  const [searchValue, setSearchValue] = useState('');
  const { setSpinner, isSpinnerShown } = useUserInterface();

  const { data: isNameAvaliable, isLoading } = useNimiIdAvalibility(searchValue);

  const { mutateAsync } = useRegisterNimiId();

  console.log(isNameAvaliable, 'isNameThere');
  console.log('isLoading', isLoading);

  const onClaimHandler = async () => {
    setSpinner(true);
    try {
      const rioName = `${searchValue}.${RIO_SUFIX}`;
      if (account) {
        const signature = await signMessage({
          message: JSON.stringify({ name: rioName, registrant: account }),
        });
        const data = await mutateAsync({
          name: rioName,
          registrant: account,
          signature: signature,
        });
        console.log('data', data);
        navigate(`domains/${searchValue}.${RIO_SUFIX}`);
      }
    } catch (e) {
      console.log('error');
    } finally {
      setSpinner(false);
    }
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
      {isSpinnerShown && <Spinner />}
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
