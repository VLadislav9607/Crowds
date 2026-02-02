import { useMutation } from '@tanstack/react-query';

import { getGroupChatIdAction } from './action';
import { showMutationErrorToast } from '@helpers';
import { IMutationOptions } from '@services';

export const useGetGroupChatId = (
  options?: IMutationOptions<string, Error, string>,
) => {
  return useMutation({
    mutationFn: getGroupChatIdAction,
    onError: showMutationErrorToast,
    ...options,
  });
};
