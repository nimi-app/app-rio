import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { getNimiIdApiClient } from '../utils';

interface Domain {
  id: string;
  name: string;
  registrant: string;
  controller: string;
  addresses: Record<string, unknown>;
  text: Record<string, unknown>;
  contenthash: string;
  avatar: string;
  description: string;
  keywords: string[];
}

interface DomainListResponse {
  domains: Domain[];
  limit: number;
  offset: number;
  total: number;
  next: string | null;
  previous: string | null;
}
/**
 * Returns query for fetching deployed Nimi page data
 */
export function useNimiIdDomains() {
  const { chainId, account } = useRainbow();

  const getNimiIds = async () => {
    const params = {
      registrant: account,
      limit: 10,
    };

    const { data } = await getNimiIdApiClient().get<{ data: DomainListResponse }>(`/domains`, { params });
    return data;
  };

  return useQuery(['fetchIdAvaliablity', account, chainId], getNimiIds, {
    enabled: account !== undefined,
  });
}
