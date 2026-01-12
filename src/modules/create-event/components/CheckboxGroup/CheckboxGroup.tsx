import { View } from 'react-native';

import { AppCheckbox, AppText } from '@ui';
import { If } from '@components';
import { styles } from './styles';

interface CheckboxGroupProps {
  label: string;
  options: { label: string; value: string; hex?: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export const CheckboxGroup = ({
  label,
  options,
  selectedValues,
  onChange,
}: CheckboxGroupProps) => {
  const allSelected =
    options.length > 0 && selectedValues.length === options.length;

  const handleToggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(options.map(o => o.value));
    }
  };

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText typography="bold_16" color="black">
          {label}
        </AppText>
        <AppCheckbox
          type="square"
          checked={allSelected}
          onChange={handleToggleAll}
          label="All"
          color="main"
          colorChecked="main"
        />
      </View>

      <View style={styles.optionsGrid}>
        {options.map(option => (
          <View key={option.value} style={styles.optionItem}>
            <If condition={!!option.hex}>
              <View style={[styles.hexBox, { backgroundColor: option.hex }]} />
            </If>
            <AppCheckbox
              type="square"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggleOption(option.value)}
              label={option.label}
              labelProps={{ color: 'dark_gray', style: styles.flex1 }}
              color="main"
              containerStyle={[styles.checkbox, !!option.hex && styles.gap36]}
              colorChecked="main"
            />
          </View>
        ))}
      </View>
    </View>
  );
};
