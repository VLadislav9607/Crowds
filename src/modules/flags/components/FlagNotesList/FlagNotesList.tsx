import { View } from 'react-native';

import { AppText } from '@ui';
import { FlagsNotesSkeleton } from '../../ui';
import { COLORS } from '@styles';

import { styles } from './styles';
import { FLAG_REASONS, FlagNotesListProps } from './types';
import { IFlagNote } from '../../screens/FlagParticipant/types';

export const FlagNotesList = ({ notes, isLoading }: FlagNotesListProps) => {
  if (isLoading && notes.length === 0) {
    return <FlagsNotesSkeleton />;
  }

  const renderNoteItem = (note: IFlagNote) => (
    <View key={note.id} style={styles.noteItem}>
      <View style={styles.noteHeader}>
        <View style={styles.noteDateRow}>
          <View
            style={[styles.noteFlagDot, { backgroundColor: COLORS[note.flag] }]}
          />
          <AppText typography="regular_12">{note.date}</AppText>
        </View>
        <AppText typography="regular_12">{note.eventName}</AppText>
      </View>

      {note.eventTitle && (
        <AppText typography="regular_12" color="gray_primary" style={styles.noteEventTitle}>
          {note.eventTitle}
        </AppText>
      )}

      <AppText
        renderIf={!!FLAG_REASONS[note.title as keyof typeof FLAG_REASONS]}
        color="red"
        typography="bold_14"
        style={styles.noteTitle}
      >
        {FLAG_REASONS[note.title as keyof typeof FLAG_REASONS]}
      </AppText>

      {note.description && (
        <AppText typography="regular_12" style={styles.noteDescription}>
          {note.description}
        </AppText>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <AppText typography="bold_16">Previous Notes</AppText>

      <AppText renderIf={notes.length === 0} style={styles.noNotesText}>
        No previous notes
      </AppText>

      {notes.map(renderNoteItem)}
    </View>
  );
};
