import { useMutation } from '@tanstack/react-query';
import { CreateChatRespDto } from './types';
import { IMutationOptions } from '@services';
import { createChatAction } from './action';

export const useCreateChat = (
  options?: IMutationOptions<CreateChatRespDto>,
) => {
  return useMutation({
    mutationFn: createChatAction,
    ...options,
  });
};
