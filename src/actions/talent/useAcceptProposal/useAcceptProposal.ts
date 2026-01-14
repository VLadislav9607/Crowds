import { useMutation } from '@tanstack/react-query';
import { acceptProposalAction } from './action';
import { IMutationOptions } from '@services';
import { AcceptProposalResDto } from './types';

export const useAcceptProposal = (
  options?: IMutationOptions<AcceptProposalResDto>,
) => {
  return useMutation({
    mutationFn: acceptProposalAction,
    ...options,
  });
};
