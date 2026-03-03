import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { showMutationErrorToast } from '@helpers';
import { createConnectLoginLinkAction } from './action';
import { CreateConnectLoginLinkResDto } from './types';

export const useCreateConnectLoginLink = (
  options?: IMutationOptions<CreateConnectLoginLinkResDto>,
) => {
  return useMutation({
    mutationFn: createConnectLoginLinkAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
  });
};
