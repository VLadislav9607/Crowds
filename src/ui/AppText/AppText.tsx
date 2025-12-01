import { Text } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';
import { AppTextProps } from './types';

export const AppText = ({
  color = 'black',
  renderIf = true,
  children,
  typography,
  ...props
}: AppTextProps) => {
  if (!renderIf) return null;

  return (
    <Text
      {...props}
      style={[
        { color: COLORS[color] },
        typography && TYPOGRAPHY[typography],
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};
