import { View } from 'react-native';
import { AppButton, AppText } from '@ui';
import { GetTeamInvitationResDto } from '@actions';
import { styles } from './styles';

interface InvitationDetailsStepProps {
  invitation: GetTeamInvitationResDto;
  onAccept: () => void;
  onDecline: () => void;
}

export const InvitationDetailsStep = ({
  invitation,
  onAccept,
  onDecline,
}: InvitationDetailsStepProps) => {
  return (
    <View style={styles.container}>
      <AppText typography="semibold_16" style={styles.title}>
        You've been invited!
      </AppText>

      <AppText
        typography="regular_14"
        color="dark_gray"
        style={styles.subtitle}
      >
        {invitation.inviterName} has invited you to join {invitation.brandName}
      </AppText>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <AppText typography="medium_12" color="dark_gray">
            Email
          </AppText>
          <AppText typography="medium_14">{invitation.email}</AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText typography="medium_12" color="dark_gray">
            Name
          </AppText>
          <AppText typography="medium_14">
            {invitation.firstName} {invitation.lastName}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText typography="medium_12" color="dark_gray">
            Position
          </AppText>
          <AppText typography="medium_14">{invitation.position}</AppText>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <AppButton title="Accept Invitation" onPress={onAccept} />
        <AppButton
          variant="withBorder"
          title="Decline"
          titleStyles={styles.declineButtonTitle}
          onPress={onDecline}
        />
      </View>
    </View>
  );
};
