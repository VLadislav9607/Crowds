import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Text as SvgText } from 'react-native-svg';
import { AppText } from '@ui';
import { getPieData, LEGEND_ITEMS } from './config';
import { ISuccessRatioChartProps } from './types';
import { styles } from './styles';

export const SuccessRatioChart = ({ report }: ISuccessRatioChartProps) => {
  const totalForChart = report
    ? report.task_completed_count +
      report.checked_in_count +
      report.no_show_count
    : 0;

  const pieData = getPieData(report, totalForChart);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <View style={styles.chartCard}>
      <Animated.View
        style={[
          styles.chartContainer,
          { transform: [{ scale: scaleAnim }], opacity: scaleAnim },
        ]}
      >
        <PieChart
          data={pieData}
          donut
          innerRadius={65}
          showExternalLabels
          // eslint-disable-next-line react/no-unstable-nested-components
          externalLabelComponent={item => <SvgText>{item?.text ?? ''}</SvgText>}
        />
      </Animated.View>

      <View style={styles.legendContainer}>
        {LEGEND_ITEMS.map(item => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <AppText style={styles.legendText}>{item.label}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
};
