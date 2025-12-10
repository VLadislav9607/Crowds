import { useState } from 'react';
import { View } from 'react-native';

import { AppButton, AppText } from '@ui';
import { AppDateInput, If } from '@components';
import { ICONS } from '@assets';

import { IDaySchedule, IDateSchedule, TimeSlot } from '../../types';
import { TimeSlotSelector } from '../TimeSlotSelector';
import { styles } from './styles';
import { DayTimeScheduleProps } from './types';
import { formatCustomTime, getScheduleKey, getScheduleLabel } from './helpers';

export const DayTimeSchedule = (props: DayTimeScheduleProps) => {
  const { mode, schedules, onChange, label = 'Set times:' } = props;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [tempFrom, setTempFrom] = useState<Date | null>(null);
  const [tempTo, setTempTo] = useState<Date | null>(null);

  const updateSchedule = <T extends IDaySchedule | IDateSchedule>(
    index: number,
    updates: Partial<T>,
  ) => {
    const updated: any = schedules.map((s, i) =>
      i === index ? { ...s, ...updates } : s,
    );
    onChange(updated);
  };

  const handleTimeSlotChange = (index: number, timeSlot: TimeSlot) => {
    updateSchedule(index, { timeSlot });

    if (timeSlot === TimeSlot.Custom) {
      const schedule = schedules[index];
      setExpandedIndex(index);
      setTempFrom(schedule?.customFrom || null);
      setTempTo(schedule?.customTo || null);
    } else {
      setExpandedIndex(null);
    }
  };

  const handleApplyCustomTime = (index: number) => {
    if (tempFrom && tempTo) {
      updateSchedule(index, { customFrom: tempFrom, customTo: tempTo });
    }
    setExpandedIndex(null);
  };

  return (
    <View style={styles.container}>
      <AppText typography="medium_14" color="gray_primary">
        {label}
      </AppText>

      <View style={styles.card}>
        {schedules.map((schedule, index) => {
          const isLast = index === schedules.length - 1;
          const isExpanded = expandedIndex === index;

          return (
            <View key={getScheduleKey(schedule, mode)}>
              <View
                style={[
                  styles.dayRow,
                  (isLast || isExpanded) && styles.dayRowLast,
                ]}
              >
                <View style={styles.dayName}>
                  <AppText typography="semibold_14" color="typography_black">
                    {getScheduleLabel(schedule, mode)}
                  </AppText>
                </View>
                <View style={styles.selector}>
                  <TimeSlotSelector
                    value={schedule.timeSlot}
                    onChange={ts => handleTimeSlotChange(index, ts as TimeSlot)}
                    customLabel={formatCustomTime(schedule)}
                  />
                </View>
              </View>

              <If condition={isExpanded}>
                <View style={styles.customTimeRow}>
                  <View style={styles.timeInput}>
                    <AppDateInput
                      placeholder="From"
                      mode="time"
                      value={tempFrom ?? undefined}
                      onChange={setTempFrom}
                      customIcon={ICONS.clockV2('black')}
                      defaultIconPosition="right"
                    />
                  </View>
                  <View style={styles.timeInput}>
                    <AppDateInput
                      placeholder="To"
                      mode="time"
                      value={tempTo ?? undefined}
                      onChange={setTempTo}
                      customIcon={ICONS.clockV2('black')}
                      defaultIconPosition="right"
                    />
                  </View>
                  <AppButton
                    title="Apply"
                    onPress={() => handleApplyCustomTime(index)}
                    wrapperStyles={styles.applyButton}
                    titleStyles={styles.applyButtonText}
                  />
                </View>
              </If>
            </View>
          );
        })}
      </View>
    </View>
  );
};
