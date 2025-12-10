import { SelectOptionField } from '@components';

import { TimeSlot } from '../../types';
import { styles } from './styles';
import { ITimeSlotSelectorProps } from './types';

const TIME_OPTIONS = [
  { label: 'All Day', value: TimeSlot.AllDay },
  { label: 'Morning (6am-12pm)', value: TimeSlot.Morning },
  { label: 'Afternoon (12pm-6pm)', value: TimeSlot.Afternoon },
  { label: 'Evening (6pm-12am)', value: TimeSlot.Evening },
  { label: 'Custom', value: TimeSlot.Custom },
  { label: 'Not Available', value: TimeSlot.NotAvailable },
];

export const TimeSlotSelector = ({
  value,
  onChange,
  customLabel,
  placeholder = 'Select time',
  containerStyle,
}: ITimeSlotSelectorProps) => {
  const getDisplayValue = (): string | undefined => {
    if (customLabel && value === TimeSlot.Custom) {
      return customLabel;
    }
    return TIME_OPTIONS.find(o => o.value === value)?.label;
  };

  return (
    <SelectOptionField
      options={TIME_OPTIONS}
      selectedValues={value}
      onOptionSelect={option => onChange(option.value as TimeSlot)}
      containerStyle={containerStyle}
      fieldProps={{
        inputStyle: styles.input,
        valueTextStyle: styles.valueText,
        placeholderText: placeholder,
        value: getDisplayValue(),
      }}
    />
  );
};
