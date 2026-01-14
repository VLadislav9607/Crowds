import { useMutation } from '@tanstack/react-query';
import { declineProposalAction } from './action';
import { IMutationOptions } from '@services';
import { DeclineProposalResDto } from './types';

export const useDeclineProposal = (
  options?: IMutationOptions<DeclineProposalResDto>,
) => {
  return useMutation({
    mutationFn: declineProposalAction,
    ...options,
  });
};
