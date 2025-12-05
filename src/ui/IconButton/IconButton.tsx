import { Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { IconButtonProps } from './types';

export const IconButton = ({
  icon,
  style,
  iconSize = 14,
  ...props
}: IconButtonProps) => {
  return (
    <Pressable hitSlop={10} {...props} style={style}>
      <SvgXml xml={icon} width={iconSize} height={iconSize} />
    </Pressable>
  );
};
