import { useMutation } from '@tanstack/react-query';

import { showErrorToast } from '@helpers';
import { sendMessageAction } from './action';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessageAction,
    onError: error => {
      if (error instanceof Error) {
        showErrorToast(error.message);
      }
    },
  });
};
