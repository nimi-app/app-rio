import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { getNimiIdApiClient } from '../utils';

interface IdAvaliblity {
  error?: string;
  valid: boolean;
}
export const RIO_SUFIX = 'ethbr.co';
/**
 * Returns query for fetching deployed Nimi page data
 */
export function useClaimCodeVerification(claimCode?: string) {
  const { chainId } = useRainbow();

  const getClaimCodeStatus = async () => {
    const params = {
      code: claimCode,
    };

    const { data } = await getNimiIdApiClient().get<{ data: IdAvaliblity }>(`/claim-code/valid`, { params });
    return data;
  };

  return useQuery(['fetchClaimCodeStatus', claimCode, chainId], getClaimCodeStatus, {});
}
