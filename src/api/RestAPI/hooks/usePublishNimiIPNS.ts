import { Nimi } from '@nimi.io/card/types';
import { useMutation } from '@tanstack/react-query';

import { getNimiAPIClient } from '../utils';

export interface PublishNimiViaIPNSParams {
  chainId: number;
  nimi: Nimi;
}

type UpdateNimiViaIPNSParams = PublishNimiViaIPNSParams & {
  signature: string;
};

interface PublishNimiIPNSResponse {
  cid: string;
  ipns: string;
}

const publishedNimiIPNS = async (params: PublishNimiViaIPNSParams) => {
  const { data } = await getNimiAPIClient().post<{
    data: PublishNimiIPNSResponse;
  }>('/nimi/publish/ipns', params);
  return data.data;
};

const updateNimiIPNS = async (params: UpdateNimiViaIPNSParams) => {
  const { data } = await getNimiAPIClient().put<{
    data: PublishNimiIPNSResponse;
  }>('/nimi/publish/ipns', params);
  return data.data;
};

interface PublishIpfsParams {
  nimi: Nimi;
  chainId: number;
}
export const publishNimiIpfs = async (params: PublishIpfsParams) => {
  const { data } = await getNimiAPIClient().post<{
    data: { cidv1: string };
  }>('/nimi/publish', params);
  return data.data;
};

/**
 * Returns mutation for getting IPNS hash
 */
export function usePublishNimiIPNS() {
  return useMutation(['publishNimiIPNS'], publishedNimiIPNS);
}

export function usePublishNimiIpfs() {
  return useMutation(['publishIpfs'], publishNimiIpfs);
}

/**
 * Returns mutation for getting IPNS hash
 */
export function useUpdateNimiIPNS() {
  return useMutation(['updateNimiIPNS'], updateNimiIPNS);
}
