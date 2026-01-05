import { AppInput, AppText } from '@ui';
import { View } from 'react-native';
import { styles } from './styles';
import { CheckboxList, If } from '@components';
import { PregnancyFieldProps } from './types';

export const PregnancyField = ({
  months,
  errorMessage,
  isPregnant,
  containerStyle,
  setMonths,
  setIsPregnant,
}: PregnancyFieldProps) => {
  console.log('months', months);
  const handleMonthsChange = (text: string) => {
    // Allow empty string (for deletion)
    if (text === '') {
      setMonths?.('');
      return;
    }

    // Only allow single digit from 1 to 9
    if (/^[1-9]$/.test(text)) {
      setMonths?.(text);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <AppText typography="medium_14">Pregnancy</AppText>
        <AppText typography="regular_14" color="grayscale_400">
          (if Yes, How many months?)
        </AppText>
      </View>

      <CheckboxList
        onCheckboxPress={item => setIsPregnant?.(item.value === 'yes')}
        checkedValues={
          typeof isPregnant === 'boolean'
            ? isPregnant
              ? ['yes']
              : ['no']
            : undefined
        }
        items={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
        containerStyle={styles.checkboxListContainer}
      />

      <If condition={!!isPregnant}>
        <AppInput
          placeholder="Enter Months"
          containerStyle={styles.inputContainer}
          keyboardType="numeric"
          value={months || ''}
          onChangeText={handleMonthsChange}
        />
      </If>

      <If condition={!!errorMessage}>
        <AppText typography="medium_10" color="red" margin={{ top: 8 }}>
          {errorMessage}
        </AppText>
      </If>
    </View>
  );
};
