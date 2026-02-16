import { TalentFlag } from '@modules/common';
import { COLORS } from '@styles';

export const FLAG_COLORS: { value: TalentFlag; color: string }[] = [
  { value: TalentFlag.YELLOW, color: COLORS.yellow },
  { value: TalentFlag.RED, color: COLORS.red },
  { value: TalentFlag.BLACK, color: COLORS.black },
];

export const FLAG_NOTES: Record<TalentFlag, string> = {
  green: '',
  yellow:
    'Yellow Flag — reporting unethical behaviour such as misrepresenting jobs or unfair treatment. The organisation will be flagged for 3 months. A second Yellow Flag escalates to a Red Flag with a 6-month suspension.',
  red: 'Red Flag — reporting serious misconduct such as aggression, NDA breaches, or failure to pay. The organisation will be suspended for 6 months pending investigation.',
  black:
    'I need urgent help — reporting a serious incident involving violence, sexual misconduct, or offences requiring first responders. This is a confidential report escalated directly to admin. All profiles will be suspended pending investigation.',
};
