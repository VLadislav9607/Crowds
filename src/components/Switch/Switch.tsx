import React from 'react';
import { StyleSheet, Switch as RNSwitch, View } from 'react-native';
import { COLORS, ColorsKeys } from '@styles';

interface IProps {
  active: boolean;
  activeColor?: ColorsKeys;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

export const Switch: React.FC<IProps> = ({
  active,
  activeColor = 'vivid_green',
  disabled = false,
  onChange,
}) => {
  const handleValueChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <RNSwitch
        value={active}
        onValueChange={handleValueChange}
        disabled={disabled}
        trackColor={{
          false: COLORS.light_gray,
          true: COLORS[activeColor],
        }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.light_gray}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
