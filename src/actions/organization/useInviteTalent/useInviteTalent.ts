import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { inviteTalentAction } from './action';
import { InviteTalentResDto } from './types';

export const useInviteTalent = (
  options?: IMutationOptions<InviteTalentResDto>,
) => {
  return useMutation({
    mutationFn: inviteTalentAction,
    ...options,
  });
};
