import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
  selectAllRow: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'flex-end',
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
  listContentNoHeader: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
  bottomBar: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  modalContent: {
    paddingHorizontal: 16,
  },
  photoContainer: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
  },
  fullPhoto: {
    width: '100%',
    height: '100%',
  },
});
