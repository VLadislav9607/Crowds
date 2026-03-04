import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  descriptionText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  statusBadgeContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  illustration: {
    width: 220,
    height: 220,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  buttonWrapper: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
