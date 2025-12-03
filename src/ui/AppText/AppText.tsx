import { Text } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';
import { AppTextProps } from './types';

export const AppText = ({
  color = 'black',
  renderIf = true,
  margin,
  children,
  typography,
  ...props
}: AppTextProps) => {
  if (!renderIf) return null;

  return (
    <Text
      {...props}
      style={[
        {
          color: COLORS[color],
          marginTop: margin?.top,
          marginBottom: margin?.bottom,
          marginLeft: margin?.left,
          marginRight: margin?.right,
        },

        typography && TYPOGRAPHY[typography],
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};
