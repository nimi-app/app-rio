import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';

import { DottedBorder } from '../../components/Button/styled';
import { Container } from '../../components/Container';
import { DomainItem } from '../../components/DomainItem';
import { ControlBar } from '../../components/domains/ControlBar';
import { NoENSBanner } from '../../components/domains/NoENSBanner';
import { Loader, LoaderWrapper } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { useRainbow } from '../../hooks/useRainbow';

export default function DomainsHomePage() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);

  const { account } = useRainbow();

  const { data: domainList, loading, hasNextPage } = useGetENSDomainsByAddress(account as string, page, searchText);

  const openENSWebsiteHandler = () => window.open('https://app.ens.domains/', '_blank')?.focus();
  const searchTextChangedHandler = (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

  return (
    <Container>
      <ControlBar value={searchText} searchTextChangedHandler={searchTextChangedHandler} />
      {(() => {
        if (loading)
          return (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          );
        if (domainList?.length === 0) return <NoENSBanner openENSWebsiteHandler={openENSWebsiteHandler} />;

        return (
          <DomainsContainer>
            {domainList?.map((domain) => (
              <DomainItem key={domain.id} domain={domain} />
            ))}
            <AddDomain onClick={openENSWebsiteHandler}>Buy an ENS</AddDomain>
          </DomainsContainer>
        );
      })()}
      <Pagination loading={loading} page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

const DomainsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: start;
  }
`;

const AddDomain = styled.button`
  ${DottedBorder}
  width: 308px;
  height: 146px;
  letter-spacing: -0.02em;
`;
