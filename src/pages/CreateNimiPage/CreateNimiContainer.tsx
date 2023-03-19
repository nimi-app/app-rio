import { Nimi, NimiThemeType } from '@nimi.io/card';

import { useIPNSData } from '../../api/RestAPI/hooks/useIPNSData';
import { Container } from '../../components/Container';
import { CreateNimi } from '../../components/CreateNimi';
import { Spinner } from '../../components/Spinner';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { useInitialtNimiData } from '../../hooks/useDefaultNimiData';
import { useRainbow } from '../../hooks/useRainbow';
import { insertPoapWidgetIntoNimi } from '../../utils';

type CreateNimiContainerProps = {
  ensName: string;
};

export function CreateNimiContainer({ ensName }: CreateNimiContainerProps) {
  const { account } = useRainbow();

  //check if user has certain poap
  const { isLoading: isThemeLoading, hasPoaps } = useAvaliableThemesFromPoaps(account);

  // //check for users current Nimi profile data or else adds data generated from ens
  // const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
  //   ensName,
  //   account,
  // });

  const { data: IPNSDATA, isLoading: IPNSLOADING } = useIPNSData(ensName);

  const nimi: Nimi = {
    ensName,
    displayName: ensName,
    addresses: [],
    ensAddress: account!,
    links: [],
    widgets: [],
    theme: { type: NimiThemeType.ETH_RIO_2023 },
  };

  if (isThemeLoading || IPNSLOADING) {
    return <Spinner />;
  }

  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={ensName as string}
        availableThemes={[NimiThemeType.ETH_RIO_2023]}
        initialNimi={insertPoapWidgetIntoNimi(nimi, hasPoaps, account)}
        nimiIPNSKey={IPNSDATA?.ipns}
      />
    </Container>
  );
}
