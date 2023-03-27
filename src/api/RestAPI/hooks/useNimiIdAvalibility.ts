import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { getNimiIdApiClient } from '../utils';

interface IdAvaliblity {
  available: boolean;
}
export const RIO_SUFIX = 'ethbr.co';
/**
 * Returns query for fetching deployed Nimi page data
 */
export function useNimiIdAvalibility(name: string) {
  const { chainId } = useRainbow();

  const getNimiIdAvaliablity = async () => {
    const params = {
      name: name + `.${RIO_SUFIX}`,
    };

    const { data } = await getNimiIdApiClient().get<{ data: IdAvaliblity }>(`/available`, { params });
    return data;
  };

  return useQuery(['fetchIdAvaliablity', name, chainId], getNimiIdAvaliablity, {
    select: ({ data }) => {
      return data.available;
    },
    enabled: name.length !== 0,
  });
}
