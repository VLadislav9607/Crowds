import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { useIsAvailableTalentAction } from './action';
import { UseIsAvailableTalentBodyDto } from './types';

export const useIsAvailableTalent = (
  options?: IMutationOptions<UseIsAvailableTalentBodyDto>,
) => {
  return useMutation({
    mutationFn: useIsAvailableTalentAction,
    ...options,
  });
};
