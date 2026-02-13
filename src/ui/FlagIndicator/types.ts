import { TalentFlag } from '@modules/common';
import { COLORS } from '@styles';
import { StyleProp, ViewStyle } from 'react-native';

export const FLAG_COLORS = {
  [TalentFlag.GREEN]: COLORS.green,
  [TalentFlag.YELLOW]: COLORS.yellow,
  [TalentFlag.RED]: COLORS.red,
  [TalentFlag.BLACK]: COLORS.black,
};

export interface FlagIndicatorProps {
  flag: TalentFlag;
  size?: number;
  style?: StyleProp<ViewStyle>;
}
