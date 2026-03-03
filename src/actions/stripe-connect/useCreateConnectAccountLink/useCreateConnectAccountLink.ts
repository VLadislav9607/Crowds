import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { showMutationErrorToast } from '@helpers';
import { createConnectAccountLinkAction } from './action';
import { CreateConnectAccountLinkResDto } from './types';

export const useCreateConnectAccountLink = (
  options?: IMutationOptions<CreateConnectAccountLinkResDto>,
) => {
  return useMutation({
    mutationFn: createConnectAccountLinkAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
  });
};
