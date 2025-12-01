import { View } from 'react-native';
import RangeSlider from 'react-native-sticky-range-slider';

import { AppText } from '@ui';

import { IRangeSelectorProps, Measure } from './types';
import { styles } from './styles';

export const RangeSelector = ({
  min,
  max,
  minValue,
  maxValue,
  label,
  measure,
  containerStyles,
  onValueChange,
  step = 1,
  disabled = false,
}: IRangeSelectorProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <RangeSlider
        style={styles.slider}
        min={min}
        max={max}
        step={step}
        low={minValue}
        high={maxValue}
        onValueChanged={onValueChange}
        renderThumb={Thumb}
        renderRail={Rail}
        renderRailSelected={RailSelected}
        renderHighValue={value => Value(value, measure)}
        renderLowValue={value => Value(value, measure)}
        disableRange={disabled}
      />
    </View>
  );
};

const Thumb = () => <View style={styles.thumb} />;

const Rail = () => <View style={styles.rail} />;

const RailSelected = () => <View style={styles.railSelected} />;

const Value = (value: number, measure: Measure) => (
  <AppText style={styles.value}>
    {value}
    {measure}
  </AppText>
);
