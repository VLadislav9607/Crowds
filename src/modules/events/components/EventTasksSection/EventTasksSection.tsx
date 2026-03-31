import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { formatInTimeZone } from 'date-fns-tz';

import { ICONS } from '@assets';
import { AppText } from '@ui';

import { EventTasksSectionProps } from './types';
import { styles } from './styles';

export const EventTasksSection = ({
  variant,
  systemTaskState,
  customTasks,
  isCheckedIn = false,
  onToggleCustomTask,
  timezone = 'UTC',
}: EventTasksSectionProps) => {
  const { checkedInAt, checkedOutAt, taskPhotoPath, isMediaProduction } =
    systemTaskState;

  const formatTimestamp = (ts: string) =>
    formatInTimeZone(ts, timezone, 'h:mm a');

  const systemTasks = [
    {
      label: 'Check-in',
      completed: !!checkedInAt,
      timestamp: checkedInAt,
      visible: true,
    },
    {
      label: 'Check-out',
      completed: !!checkedOutAt,
      timestamp: checkedOutAt,
      visible: true,
    },
    {
      label: 'Upload photo',
      completed: !!taskPhotoPath,
      timestamp: null,
      visible: !isMediaProduction,
    },
  ];

  const isOrg = variant === 'org';

  const renderTaskIcon = (completed: boolean, isSystem: boolean) => {
    if (isOrg) {
      return (
        <SvgXml xml={ICONS.checkedCircle('main')} width={20} height={20} />
      );
    }
    if (completed) {
      return (
        <View style={styles.iconCompleted}>
          <SvgXml xml={ICONS.checked('white')} width={10} height={10} />
        </View>
      );
    }
    if (isSystem) {
      return (
        <View style={styles.iconSystem}>
          <SvgXml xml={ICONS.clockV2('main')} width={14} height={14} />
        </View>
      );
    }
    return <View style={styles.iconUnchecked} />;
  };

  return (
    <View style={styles.container}>
      <AppText typography="bold_16" margin={{ bottom: 4 }}>
        Tasks
      </AppText>

      {systemTasks
        .filter(t => t.visible)
        .map(task => (
          <View
            key={task.label}
            style={[styles.taskRow, task.completed && styles.taskRowCompleted]}
          >
            {renderTaskIcon(task.completed, true)}
            <AppText
              typography={task.completed ? 'regular_14' : 'semibold_14'}
              color={task.completed ? 'gray' : 'black'}
              style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted,
              ]}
            >
              {task.label}
            </AppText>
            {task.completed && task.timestamp ? (
              <AppText typography="regular_12" color="gray">
                {formatTimestamp(task.timestamp)}
              </AppText>
            ) : (
              <AppText typography="regular_12" color={isOrg ? 'main_60' : 'gray'}>
                Auto
              </AppText>
            )}
          </View>
        ))}

      {customTasks.map(task => {
        const isCompleted = task.is_completed ?? false;
        const isTalent = variant === 'talent';
        const isDisabled = isTalent && !isCheckedIn;

        const content = (
          <View
            style={[
              styles.taskRow,
              isCompleted && styles.taskRowCompleted,
              isDisabled && styles.taskRowDisabled,
            ]}
          >
            {renderTaskIcon(isCompleted, false)}
            <AppText
              typography={isCompleted ? 'regular_14' : 'semibold_14'}
              color={isCompleted ? 'gray' : 'black'}
              style={[
                styles.taskText,
                isCompleted && styles.taskTextCompleted,
              ]}
            >
              {task.text}
            </AppText>
          </View>
        );

        if (isTalent && !isDisabled && onToggleCustomTask) {
          return (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.7}
              onPress={() => onToggleCustomTask(task.id)}
            >
              {content}
            </TouchableOpacity>
          );
        }

        return <View key={task.id}>{content}</View>;
      })}
    </View>
  );
};
