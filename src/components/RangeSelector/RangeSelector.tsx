import { View } from 'react-native';
import { AppText } from '@ui';
import { IRangeSelectorProps } from './types';
import { styles } from './styles';
import { If } from '../If';
import { useEffect, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';

export const RangeSelector = ({
  min,
  max,
  defaultMinValue,
  defaultMaxValue,
  label,
  containerStyles,
  step = 1,
  disableRange = false,
  labelProps,
  bottomLabels,
  measure,
  disabled = false,
  onRenderValue,
  onSlidingComplete,
}: IRangeSelectorProps) => {
  const [values, setValues] = useState({
    min: defaultMinValue,
    max: defaultMaxValue,
  });

  useEffect(() => {
    setValues({ min: defaultMinValue, max: defaultMaxValue });
  }, [defaultMinValue, defaultMaxValue]);

  return (
    <View style={[styles.container, containerStyles]}>
      {label && (
        <AppText
          typography="medium_14"
          {...labelProps}
          style={[styles.label, labelProps?.style]}
        >
          {label}
        </AppText>
      )}

      <View style={styles.sliderContainer}>
        <View style={[styles.flex1, disabled && styles.disabled]}>
          <Slider
            value={disableRange ? values.min : [values.min, values.max]}
            onValueChange={value => {
              setValues({ min: value[0], max: value[1] });
            }}
            minimumValue={min}
            maximumValue={max}
            renderThumbComponent={Thumb}
            renderMaximumTrackComponent={Rail}
            renderMinimumTrackComponent={RailSelected}
            step={step}
            onSlidingComplete={onSlidingComplete}
            disabled={disabled}
          />

          <If condition={!!bottomLabels}>
            <View
              style={[styles.labelsContainer, bottomLabels?.containerStyles]}
            >
              {bottomLabels?.minValueLabel && (
                <AppText
                  typography="regular_10"
                  color="black_50"
                  {...bottomLabels?.labelProps}
                >
                  {bottomLabels?.minValueLabel}
                </AppText>
              )}
              {bottomLabels?.maxValueLabel && (
                <AppText
                  typography="regular_10"
                  color="black_50"
                  {...bottomLabels?.labelProps}
                >
                  {bottomLabels?.maxValueLabel}
                </AppText>
              )}
            </View>
          </If>
        </View>

        <If condition={!!measure}>
          <AppText typography="bold_14" color="black">
            {measure}
          </AppText>
        </If>
      </View>

      <AppText
        color="black"
        typography="semibold_14"
        margin={{ top: 10 }}
        style={disabled && styles.disabled}
      >
        {onRenderValue(values)}
      </AppText>
    </View>
  );
};

const Thumb = () => <View style={styles.thumb} />;

const Rail = () => <View style={styles.rail} />;

const RailSelected = () => <View style={styles.railSelected} />;
