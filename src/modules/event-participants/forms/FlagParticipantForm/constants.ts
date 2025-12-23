import { AvatarFlag } from '@ui';
import { COLORS } from '@styles';

export const FLAG_COLORS: { value: AvatarFlag; color: string }[] = [
  { value: 'green', color: COLORS.green },
  { value: 'yellow', color: COLORS.yellow },
  { value: 'red', color: COLORS.red },
  { value: 'black', color: COLORS.black },
];

export const FLAG_NOTES: Record<AvatarFlag, string> = {
  green:
    'You are selecting a Green Flag, marking this talent as verified and trustworthy. No issues have been reported.',
  yellow:
    'You are selecting a Yellow Flag, which indicates possible issues or suspicious behavior. This talent will be marked for observation, and further action may be taken if concerns persist or increase.',
  red: 'You are selecting a Red Flag, which highlights major concerns with this talent. Admins will be alerted to monitor and assess the situation. If the issue worsens, this may escalate to a black flag.',
  black:
    'Selecting a black flag automatically notifies admin to review and make a decision whether to suspend or delete the participant.',
};
