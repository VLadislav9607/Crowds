import { ActivityIndicator, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { IconButtonProps } from './types';

export const IconButton = ({
  icon,
  style,
  iconSize = 14,
  isLoading = false,
  ...props
}: IconButtonProps) => {
  return (
    <Pressable
      hitSlop={10}
      {...props}
      style={style}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <SvgXml xml={icon} width={iconSize} height={iconSize} />
      )}
    </Pressable>
  );
};
