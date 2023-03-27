import { signMessage } from '@wagmi/core';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { Content, HeaderEyebrow, PageWrapper } from './styled';
import { useClaimCodeVerification } from '../../api/RestAPI/hooks/useClaimCodeVerification';
import { useNimiIdAvalibility } from '../../api/RestAPI/hooks/useNimiIdAvalibility';
import { useRegisterNimiId } from '../../api/RestAPI/hooks/useRegisterNimiId';
import { Button } from '../../components/Button';
import { RainbowConnectButton } from '../../components/Button/ConnectButton';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SearchInputSelect } from '../../components/Input/SearchInput';
import '@rainbow-me/rainbowkit/styles.css';
import { Spinner } from '../../components/Spinner';
import { useDebounce } from '../../hooks/useDebounce';
import { useRainbow } from '../../hooks/useRainbow';
import { useUserInterface } from '../../services/useUserInterface';

export const RIO_SUFIX = 'ethbr.co';

export function Landing() {
  const navigate = useNavigate();
  const { claimCode } = useParams();
  const { account } = useRainbow();

  const [searchValue, setSearchValue] = useState('');
  const { setSpinner, isSpinnerShown } = useUserInterface();
  const deboucedSearchValue = useDebounce(searchValue, 500);

  const { data: isNameAvaliable, isLoading } = useNimiIdAvalibility(deboucedSearchValue);
  const { data: claimCodeData } = useClaimCodeVerification(claimCode);
  const { mutateAsync } = useRegisterNimiId();

  const onClaimHandler = async () => {
    setSpinner(true);
    try {
      const rioName = `${searchValue}.${RIO_SUFIX}`;
      if (account && claimCode) {
        // const signature = await signMessage({
        //   message: JSON.stringify({ name: rioName, registrant: account, claimCode }),
        // });
        // const data = await mutateAsync({
        //   name: rioName,
        //   registrant: account,
        //   signature: signature,
        //   claimCode,
        // });
        // console.log('data', data);

        navigate(`domains/${searchValue}.${RIO_SUFIX}`);
      }
    } catch (e) {
      console.log('error');
    } finally {
      setSpinner(false);
    }
  };

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextSearchQuery = e.target.value.trim();
    const regex = /^[a-zA-Z]+$/;
    if (nextSearchQuery === '' || regex.test(nextSearchQuery)) {
      setSearchValue(nextSearchQuery);
    }
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
          handleOnChange={handleOnChange}
          value={searchValue}
          isSearching={isLoading}
          isNameAvailable={isNameAvaliable}
        />

        <RainbowConnectButton>
          <Button onClick={onClaimHandler} disabled={!isNameAvaliable || !claimCodeData?.data.valid}>
            {claimCode === undefined ? 'No claim code' : !claimCodeData?.data.valid ? 'Invalid code' : 'Claim username'}
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
