import { View, TextInput, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import { AppText, AppButton } from '@ui';
import { COLORS } from '@styles';
import { If } from '@components';
import { TalentFlag } from '@modules/common';

import { styles } from './styles';
import { FLAG_COLORS, FLAG_NOTES } from './constants';
import { useFlagParticipantForm } from '../../hooks';
import { FlagNoteWarningModal } from '../../modals';

interface FlagParticipantFormProps {
  talentId: string;
  eventId: string;
}

export const FlagParticipantForm = ({
  talentId,
  eventId,
}: FlagParticipantFormProps) => {
  const {
    control,
    selectedFlag,
    setSelectedFlag,
    isValid,
    isLoading,
    handleSubmit,
    isNoteModalVisible,
    openNoteModal,
    closeNoteModal,
    confirmNoteModal,
  } = useFlagParticipantForm({ talentId, eventId });

  return (
    <>
      <View style={styles.selectFlagSection}>
        <AppText typography="bold_16">Select flag</AppText>
        <View style={styles.flagOptions}>
          {FLAG_COLORS.slice(1, FLAG_COLORS.length).map(flag => (
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

      <If condition={!!selectedFlag}>
        <AppText typography="regular_12" style={styles.noteText}>
          <AppText typography="bold_12">Note: </AppText>
          {FLAG_NOTES[selectedFlag]}
        </AppText>
      </If>

      <If condition={selectedFlag !== TalentFlag.GREEN}>
        <AppText typography="bold_14" style={styles.reasonTitle}>
          Please add a note as to why you've selected a {selectedFlag} flag for
          this participant.
        </AppText>

        <Controller
          control={control}
          name="reason"
          rules={{
            validate: value => value.trim().length >= 10,
          }}
          render={({ field }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Type your reason here"
              placeholderTextColor={COLORS.black_40}
              value={field.value}
              onChangeText={field.onChange}
              multiline
              scrollEnabled
              textAlignVertical="top"
            />
          )}
        />
      </If>

      <AppButton
        title="Submit"
        isDisabled={!isValid || isLoading}
        onPress={handleSubmit(openNoteModal)}
      />

      <FlagNoteWarningModal
        isVisible={isNoteModalVisible}
        title="Note"
        isLoading={isLoading}
        note={FLAG_NOTES[selectedFlag]}
        onClose={closeNoteModal}
        onConfirm={confirmNoteModal}
      />
    </>
  );
};
