import { Text, TextProps } from 'react-native';

import { COLORS, ColorsKeys } from '@styles';

interface IProps extends TextProps {
  color?: ColorsKeys;
  children: React.ReactNode;
}

export const AppText = ({ color = 'black', children, ...props }: IProps) => {
  return (
    <Text {...props} style={[{ color: COLORS[color] }, props.style]}>
      {children}
    </Text>
  );
};
