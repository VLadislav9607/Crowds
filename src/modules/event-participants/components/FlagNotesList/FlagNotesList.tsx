import { View } from 'react-native';

import { AppText } from '@ui';
import { COLORS } from '@styles';

import { styles } from './styles';
import { FlagNotesListProps } from './types';
import { IFlagNote } from '../../screens/FlagParticipant/types';

export const FlagNotesList = ({ notes }: FlagNotesListProps) => {
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

      <AppText typography="bold_14" style={styles.noteTitle}>
        {note.title}
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
      {notes.map(renderNoteItem)}
    </View>
  );
};
