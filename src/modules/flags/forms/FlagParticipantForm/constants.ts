import { TalentFlag } from '@modules/common';
import { COLORS } from '@styles';

export const FLAG_COLORS: { value: TalentFlag; color: string }[] = [
  { value: TalentFlag.GREEN, color: COLORS.green },
  { value: TalentFlag.YELLOW, color: COLORS.yellow },
  { value: TalentFlag.RED, color: COLORS.red },
  { value: TalentFlag.BLACK, color: COLORS.black },
];

export const FLAG_NOTES: Record<TalentFlag, string> = {
  green:
    'You are selecting a Green Flag, marking this talent as verified and trustworthy. No issues have been reported.',
  yellow:
    'You are selecting a Yellow Flag, which indicates possible issues or suspicious behavior. This talent will be marked for observation, and further action may be taken if concerns persist or increase.',
  red: 'You are selecting a Red Flag, which highlights major concerns with this talent. Admins will be alerted to monitor and assess the situation. If the issue worsens, this may escalate to a black flag.',
  black:
    'Selecting a Black Flag automatically notifies admin to review and make a decision whether to suspend or delete the participant.',
};
