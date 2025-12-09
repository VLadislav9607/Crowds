import { Pressable, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { COLORS, TYPOGRAPHY } from '@styles';

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
      <AppText style={styles.text} {...textProps}>
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
  text: {
    ...TYPOGRAPHY.medium_10,
    color: COLORS.black_50,
  },
});
