import { View, StyleSheet } from 'react-native';
import { AppButton, AppText } from '@ui';
import { OrgBaseEventCard, cardStyles, IOrgBaseEventCardProps } from '../../ui';
import { ICONS } from '@assets';
import { COLORS } from '@styles';

interface PastEventCardProps extends IOrgBaseEventCardProps {
  isCancelled?: boolean;
}

export const PastEventCard = ({ event, isCancelled }: PastEventCardProps) => {
  const headerRight = (
    <View style={pastStyles.headerRight}>
      {isCancelled && (
        <View style={pastStyles.cancelledBadge}>
          <AppText typography="bold_10" color="red">
            CANCELLED
          </AppText>
        </View>
      )}
      <AppButton
        title="VIEW"
        size="28"
        width={75}
        onPress={() => {}}
        iconPlace="right"
        icon={ICONS.chevronRight('main')}
        wrapperStyles={cardStyles.primaryButton}
        titleStyles={cardStyles.primaryButtonText}
      />
    </View>
  );

  return <OrgBaseEventCard event={event} headerRight={headerRight} />;
};

const pastStyles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cancelledBadge: {
    backgroundColor: COLORS.red_light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
