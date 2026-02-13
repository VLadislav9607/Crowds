import { FLAG_REASONS } from '../components/FlagNotesList/types';

export const getReasonLabel = (
  reason: string | null,
  description: string | null,
): string => {
  if (!reason && !description) return 'No reason provided';
  const mapped =
    reason && reason in FLAG_REASONS
      ? (FLAG_REASONS as Record<string, string>)[reason]
      : reason;
  if (mapped && description) return `${mapped}. ${description}`;
  return mapped || description || 'No reason provided';
};
