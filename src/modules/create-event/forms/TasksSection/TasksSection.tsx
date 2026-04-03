import { forwardRef, useRef, useEffect } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { AppText, IconButton } from '@ui';
import { COLORS } from '@styles';

import { CreateEventFormData } from '../../validation';
import { styles, MAX_CHARACTERS } from './styles';

const DEFAULT_TASKS = [
  { label: 'Check-in', alwaysVisible: true },
  { label: 'Check-out', alwaysVisible: true },
  { label: 'Upload photo', alwaysVisible: false },
];

interface CustomTaskRowProps {
  value: string;
  onChange: (text: string) => void;
  onRemove: () => void;
  autoFocus?: boolean;
}

const CustomTaskRow = ({
  value,
  onChange,
  onRemove,
  autoFocus,
}: CustomTaskRowProps) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  return (
    <View style={styles.customTaskRow}>
      <SvgXml xml={ICONS.checkedCircle('main')} width={16} height={16} />
      <TextInput
        ref={inputRef}
        style={styles.customTaskInput}
        value={value}
        onChangeText={text => {
          if (text.length <= MAX_CHARACTERS) {
            onChange(text);
          }
        }}
        placeholder="E.g., Please wear a white t-shirt"
        placeholderTextColor={COLORS.gray}
        maxLength={MAX_CHARACTERS}
      />
      <IconButton
        icon={ICONS.trash('red')}
        iconSize={18}
        onPress={onRemove}
      />
    </View>
  );
};

export const TasksSection = forwardRef<View>((_props, ref) => {
  const { control } = useFormContext<CreateEventFormData>();

  const eventType = useWatch({ control, name: 'eventType' });
  const isMediaProduction = eventType === 'media_production';

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <AppText typography="h5_mob" color="black" style={styles.label}>
        Tasks
      </AppText>

      {DEFAULT_TASKS.map(task => {
        if (!task.alwaysVisible && isMediaProduction) return null;
        return (
          <View key={task.label} style={styles.defaultTaskRow}>
            <SvgXml
              xml={ICONS.checkedCircle('main')}
              width={16}
              height={16}
            />
            <AppText
              typography="regular_14"
              color="main"
              style={styles.taskText}
            >
              {task.label}
            </AppText>
            <AppText typography="regular_12" color="main_60">
              Auto
            </AppText>
          </View>
        );
      })}

      <Controller
        control={control}
        name="customTasks"
        render={({ field: { value = [], onChange } }) => (
          <View style={{ gap: 10 }}>
            {value.map((item: string, index: number) => (
              <CustomTaskRow
                key={index}
                value={item}
                autoFocus={item === ''}
                onChange={text =>
                  onChange(
                    value.map((v: string, i: number) =>
                      i === index ? text : v,
                    ),
                  )
                }
                onRemove={() =>
                  onChange(
                    value.filter((_: string, i: number) => i !== index),
                  )
                }
              />
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onChange([...value, ''])}
              activeOpacity={0.7}
            >
              <SvgXml xml={ICONS.plus('main')} width={16} height={16} />
              <AppText typography="bold_14" color="main">
                ADD CUSTOM TASK
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
});
