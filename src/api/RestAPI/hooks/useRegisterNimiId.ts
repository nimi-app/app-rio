import { useMutation } from '@tanstack/react-query';

import { getNimiIdApiClient } from '../utils';

export interface RegisterIdParams {
  name: string;
  registrant: string;
  signature: string;
}

interface PublishNimiIPNSResponse {
  nimiId: any;
}

const registerId = async (params: RegisterIdParams) => {
  const { data } = await getNimiIdApiClient().post<{
    data: PublishNimiIPNSResponse;
  }>('/register', params);
  return data.data;
};

/**
 * Returns mutation for getting IPNS hash
 */
export function useRegisterNimiId() {
  return useMutation(['registerNimiId'], registerId);
}
