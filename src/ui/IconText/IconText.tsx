import { Pressable, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppText } from '../AppText';
import { IconTextProps } from './types';

export const IconText = ({
  icon,
  iconSize = 14,
  gap = 3,
  text,
  textProps,
  ...props
}: IconTextProps) => {
  return (
    <Pressable
      hitSlop={10}
      disabled={!props.onPress}
      {...props}
      style={[styles.container, { gap }, { ...props?.style }]}
    >
      <SvgXml xml={icon} width={iconSize} height={iconSize} />
      <AppText color='black' typography='medium_10' {...textProps}>
        {text}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
 
});
