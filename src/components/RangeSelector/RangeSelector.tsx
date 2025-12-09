import { View } from 'react-native';
import RangeSlider from 'react-native-sticky-range-slider';
import { AppText } from '@ui';
import { IRangeSelectorProps } from './types';
import { styles } from './styles';
import { If } from '../If';

export const RangeSelector = ({
  min,
  max,
  minValue,
  maxValue,
  label,
  containerStyles,
  step = 1,
  disableRange = false,
  labelProps,
  bottomLabels,
  measure,
  value,
  onValueChange,
}: IRangeSelectorProps) => {
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
        <View style={styles.flex1}>
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
            renderHighValue={() => null}
            renderLowValue={() => null}
            disableRange={disableRange}
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

      <AppText color="black" typography="semibold_14" margin={{ top: 10 }}>
        {value}
      </AppText>
    </View>
  );
};

const Thumb = () => <View style={styles.thumb} />;

const Rail = () => <View style={styles.rail} />;

const RailSelected = () => <View style={styles.railSelected} />;
