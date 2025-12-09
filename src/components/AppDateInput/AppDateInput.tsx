import { TouchableOpacity, View } from 'react-native';
import { AppText } from '../../ui/AppText';
import { AppDateInputProps } from './types';
import { ICONS } from '@assets';
import { styles } from './styles';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import { If } from '@components';
import DatePicker from 'react-native-date-picker';

export const AppDateInput = ({
  label,
  errorMessage,
  labelProps,
  containerStyle,
  errorMessageProps,
  placeholder,
  value,
  customIcon,
  mode = 'date',
  defaultIconPosition = 'left',
  fieldStyle,
  placeholderProps,
  valueProps,
  onChange,
  ...props
}: AppDateInputProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onConfirm = (date: Date) => {
    setShowDatePicker(false);
    onChange?.(date);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <If condition={!!label}>
          <AppText
            color={props.disabled ? 'black_40' : 'black_50'}
            typography="medium_14"
            {...labelProps}
            style={[styles.label, styles.label]}
          >
            {label}
          </AppText>
        </If>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setShowDatePicker(true)}
          style={[styles.field, fieldStyle]}
        >
          <If condition={defaultIconPosition === 'left'}>
            <SvgXml
              xml={customIcon || ICONS.calendarIcon('main')}
              width={20}
              height={20}
            />
          </If>

          <If condition={!value && !!placeholder}>
            <AppText
              color="black_40"
              typography="regular_14"
              {...placeholderProps}
              style={[styles.placeholder, placeholderProps?.style]}
            >
              {placeholder}
            </AppText>
          </If>
          <If condition={!!value}>
            <AppText
              color="black"
              typography="regular_14"
              {...valueProps}
              style={[styles.value, valueProps?.style]}
            >
              {value?.toLocaleDateString()}
            </AppText>
          </If>

          <If condition={defaultIconPosition === 'right'}>
            <SvgXml
              xml={customIcon || ICONS.calendarWithDays()}
              width={20}
              height={20}
            />
          </If>
        </TouchableOpacity>

        <If condition={!!errorMessage}>
          <AppText
            typography="medium_10"
            color="red"
            {...errorMessageProps}
            style={[styles.errorMessage, styles.errorMessage]}
          >
            {errorMessage}
          </AppText>
        </If>
      </View>

      <DatePicker
        modal
        mode={mode}
        open={showDatePicker}
        date={value || new Date()}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};
