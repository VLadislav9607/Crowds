import { useMutation } from '@tanstack/react-query';

import { sendMessageAction } from './action';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessageAction,
  });
};
