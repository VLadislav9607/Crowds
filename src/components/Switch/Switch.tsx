import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SwitchProps } from 'react-native';
import { Switch as RNSwitch } from 'react-native';

interface IProps extends Omit<SwitchProps, 'onChange'> {
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
  ...props
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
        {...props}
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
