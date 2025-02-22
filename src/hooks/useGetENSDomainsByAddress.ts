import { useMemo } from 'react';

import { useRainbow } from './useRainbow';
import { getGraphQLClient, GRAPH_ENDPOINT } from '../api/GraphQl/graphClient';
import {
  GetDomainsOwnedOrControlledByQuery,
  useGetDomainsOwnedOrControlledByQuery,
} from '../api/GraphQl/schemas/generated/ens';
import { ENSDomain } from '../models';

export interface UserENSDomains {
  data: ENSDomain[];
  loading: boolean;
  hasNextPage?: boolean;
}

const numberOfItemsPerPage = 8;

/**
 * Fetches all **valid** ENS domains owned or controlled by the given address.
 *
 * Names that include `[` or `]` are considered invalid unless they resolve to a valid ENS name.
 *
 * For example, `[b009fb4ac7328256e8cebb99127b1eb7e7ae60933e24f36f5567ef75724d690d].sismo.eth` should resolve to `abc.sismo.eth` to be considered valid.
 *
 * @param address
 * @returns {UserENSDomains} data and loading state
 */
export function useGetENSDomainsByAddress(address: string, page = 0, searchString?: string): UserENSDomains {
  const { chainId } = useRainbow();

  function domainOrdering(data) {
    const domainsOwned = data?.account?.domainsOwned ?? [];
    const domainsControlled = data?.domainsControlled ?? [];

    // We need to merge the two arrays and remove duplicates
    const allUserDomains = [...domainsOwned, ...domainsControlled];

    const uniqueDomains = allUserDomains.reduce((acc, domain) => {
      // If the domain is already in the array, we don't want to add it again
      const isDomainDuplicate = acc.find((d: any) => d?.id === domain?.id);
      if (isDomainDuplicate) return acc;

      const isNameEncrypted = domain?.name?.includes('[');

      if (isNameEncrypted) {
        // If the name is encrypted, we need to decrypt it
        // The following helps finding subdomains that are encrypted at <name>.sismo.eth
        const foundDomainFromAllUserDomains = allUserDomains.find(
          ({ labelhash }) => labelhash?.toLowerCase() == domain.labelhash?.toLowerCase()
        );

        // Luckily, we can find the domain in the array, so we can use it to get the labelName
        if (
          foundDomainFromAllUserDomains &&
          foundDomainFromAllUserDomains.labelName !== null &&
          foundDomainFromAllUserDomains.labelName !== undefined
        ) {
          // Breakdown the domain into: subdomain, domain, tld (eth/xyz/etc)
          const domainNameParts = domain?.name?.split('.') as string[];
          // Repllce the subdomain with the decrypted name
          domainNameParts[0] = foundDomainFromAllUserDomains.labelName;

          domain = {
            ...domain,
            name: domainNameParts.join('.'),
          };
        }
      }

      if (!domain.name?.includes('[')) {
        acc.push(domain as any);
      }

      return acc;
    }, [] as GetDomainsOwnedOrControlledByQuery['domainsControlled']);

    return uniqueDomains;
  }

  const { isLoading, data, isError, isSuccess, isFetching } = useGetDomainsOwnedOrControlledByQuery(
    getGraphQLClient(GRAPH_ENDPOINT.ENS, chainId),
    {
      addressID: address?.toLowerCase(),
      searchString: searchString,
      addressString: address?.toLowerCase(),
      skip: page * numberOfItemsPerPage,
      first: numberOfItemsPerPage + 1,
      chainId,
    },
    { keepPreviousData: true, select: domainOrdering }
  );

  const waitedForData: ENSDomain[] = useMemo(() => {
    if (data && !isError && isSuccess && !isFetching && !isLoading) return data;
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, isError, isFetching]);

  return {
    data: waitedForData && waitedForData.slice(0, numberOfItemsPerPage),
    loading: isLoading || isFetching,
    hasNextPage: waitedForData && waitedForData.length > numberOfItemsPerPage && (!isLoading || !isFetching),
  };
}
