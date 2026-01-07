import { useMutation } from '@tanstack/react-query';
import { CreateDirectChatRespDto } from './types';
import { IMutationOptions } from '@services';
import { createDirectChatAction } from './action';

export const useCreateDirectChat = (
  options?: IMutationOptions<CreateDirectChatRespDto>,
) => {
  return useMutation({
    mutationFn: createDirectChatAction,
    ...options,
  });
};
