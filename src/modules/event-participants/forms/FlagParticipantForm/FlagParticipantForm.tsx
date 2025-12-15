import { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';

import { AppText, AppButton, AvatarFlag } from '@ui';
import { COLORS } from '@styles';
import { If } from '@components';

import { styles } from './styles';
import { FLAG_COLORS, FLAG_NOTES } from './constants';

export const FlagParticipantForm = () => {
  const [selectedFlag, setSelectedFlag] = useState<AvatarFlag>('yellow');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    console.log('Submit flag:', selectedFlag, reason);
  };

  return (
    <>
      <View style={styles.selectFlagSection}>
        <AppText typography="bold_16">Select flag</AppText>
        <View style={styles.flagOptions}>
          {FLAG_COLORS.map(flag => (
            <Pressable
              key={flag.value}
              onPress={() => setSelectedFlag(flag.value)}
              style={[
                styles.flagCircle,
                { backgroundColor: flag.color },
                {
                  borderColor:
                    flag.value === 'black' ? COLORS.gray : COLORS.black,
                },
                selectedFlag === flag.value && styles.flagCircleSelected,
              ]}
            />
          ))}
        </View>
      </View>

      <AppText typography="regular_12" style={styles.noteText}>
        <AppText typography="bold_12">Note: </AppText>
        {FLAG_NOTES[selectedFlag]}
      </AppText>

      <If condition={selectedFlag !== 'green'}>
        <AppText typography="bold_14" style={styles.reasonTitle}>
          Please add a note as to why you've selected a {selectedFlag} flag for
          this participant.
        </AppText>

        <TextInput
          style={styles.textInput}
          placeholder="Type your reason here"
          placeholderTextColor={COLORS.black_40}
          value={reason}
          onChangeText={setReason}
          multiline
        />
      </If>

      <AppButton
        title="Submit"
        isDisabled={selectedFlag !== 'green' && !reason}
        onPress={handleSubmit}
      />
    </>
  );
};
