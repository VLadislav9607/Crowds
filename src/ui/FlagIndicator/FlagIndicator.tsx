import { View } from 'react-native';
import { styles } from './styles';
import { FLAG_COLORS, FlagIndicatorProps } from './types';

export const FlagIndicator = ({
  flag,
  size = 32,
  style,
}: FlagIndicatorProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: FLAG_COLORS[flag], width: size, height: size },
        style,
      ]}
    />
  );
};
