import { View, StyleSheet } from 'react-native';
import { AppButton } from '@ui';
import { COLORS } from '@styles';
import { useGetMe } from '@actions';
import { If } from '@components';
import { ICONS } from '@assets';

interface CreateEventFooterProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
  onCopyToDraft?: () => void;
}

export const CreateEventFooter = ({
  onCancel,
  onSaveDraft,
  onNext,
  onCopyToDraft,
}: CreateEventFooterProps) => {
  const { organizationMember } = useGetMe();
  const currentContext = organizationMember?.current_context;

  const hasAccessToPublishEvent =
    currentContext?.capabilitiesAccess.create_events;
  const hasAccessToCreateDraft =
    currentContext?.capabilitiesAccess.create_event_draft;

  return (
    <View style={styles.footer}>
      <AppButton
        title="Cancel"
        variant="withBorder"
        onPress={onCancel}
        titleStyles={styles.buttonTitle}
      />
      <If condition={!!hasAccessToCreateDraft || !!hasAccessToPublishEvent}>
        <AppButton
          title="Save draft"
          variant="withBorder"
          onPress={onSaveDraft}
          titleStyles={styles.buttonTitle}
        />
      </If>
      <If condition={!!hasAccessToPublishEvent}>
        <AppButton title="Publish event" onPress={onNext} />
      </If>
      <If condition={!!onCopyToDraft}>
        <AppButton
          icon={ICONS.copyIcon('black')}
          title="Copy to draft"
          variant="withBorder"
          onPress={onCopyToDraft!}
          titleStyles={styles.buttonTitle}
        />
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  buttonTitle: {
    color: COLORS.black,
  },
});
