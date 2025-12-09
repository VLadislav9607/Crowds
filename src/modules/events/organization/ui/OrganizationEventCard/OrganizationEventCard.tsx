import { Image, StyleSheet, View } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';
import { AppButton, AppText, IconText } from '@ui';
import { ICONS } from '@assets';
import { If } from '@components';

interface OrganizationEventCardProps {
  name: string;
  location: string;
  image: string;
  startDate: string;
  isDraft?: boolean;
  isPast?: boolean;
  isUpcoming?: boolean;
  participants?: number;
  maxParticipants?: number;
}

export const OrganizationEventCard = ({
  name,
  location,
  image,
  participants,
  maxParticipants,
  startDate,
  isDraft,
  isPast,
  isUpcoming,
}: OrganizationEventCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <AppText style={styles.name}>{name}</AppText>
        <AppText renderIf={!!isUpcoming} style={styles.participants}>
          TALENT FILLED {participants}/{maxParticipants}
        </AppText>

        <If condition={!!isPast}>
          <AppButton
            title="VIEW"
            size="28"
            icon={ICONS.chevronRight('main')}
            iconPlace="right"
            wrapperStyles={styles.viewEventButton}
            titleStyles={styles.eventButtonText}
          />
        </If>

        <If condition={!!isDraft}>
          <AppButton
            title="INVITE TALENT"
            size="28"
            wrapperStyles={styles.textButton}
            titleStyles={styles.viewApplicantsButtonText}
          />
        </If>
      </View>
      <View style={styles.dashedLine} />
      <View style={styles.infoContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.row}>
            <IconText
              icon={ICONS.calendarIcon('main')}
              text={'03 OCT, 2025'}
              iconSize={14}
            />
            <IconText
              icon={ICONS.clockIcon('main')}
              text={'03 Hours'}
              iconSize={14}
            />
          </View>
          <IconText icon={ICONS.locationMap()} text={location} iconSize={14} />
        </View>
      </View>
      <View style={styles.dashedLine} />

      <If condition={!isPast}>
        <View style={styles.bottomButtons}>
          <AppButton
            title="MANAGE EVENT"
            size="28"
            icon={ICONS.chevronRight('main')}
            iconPlace="right"
            width={135}
            wrapperStyles={styles.manageEventButton}
            titleStyles={styles.eventButtonText}
          />
          <AppButton
            title="VIEW APPLICANTS"
            size="28"
            wrapperStyles={styles.textButton}
            titleStyles={styles.viewApplicantsButtonText}
          />
        </View>
      </If>

      <If condition={!!isDraft}>
        <View style={styles.bottomButtons}>
          <AppButton
            title="POST To Job Board"
            size="28"
            icon={ICONS.chevronRight('main')}
            iconPlace="right"
            wrapperStyles={styles.manageEventButton}
            titleStyles={styles.eventButtonText}
          />
          <AppButton
            title="EDIT EVENT"
            size="28"
            wrapperStyles={styles.textButton}
            titleStyles={styles.viewApplicantsButtonText}
          />
        </View>
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 4,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  dashedLine: {
    height: 0.5,
    borderWidth: 0.5,
    borderColor: COLORS.black_20,
    borderStyle: 'dashed',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoContent: {
    flex: 1,
    gap: 8,
  },
  participants: {
    ...TYPOGRAPHY.medium_9,
    color: COLORS.red,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manageEventButton: {
    backgroundColor: COLORS.main10,
    width: 135,
    paddingHorizontal: 0,
  },
  viewEventButton: {
    width: 78,
    paddingHorizontal: 0,
    backgroundColor: COLORS.main10,
  },
  eventButtonText: {
    color: COLORS.main,
  },
  viewApplicantsButtonText: {
    color: COLORS.main,
    ...TYPOGRAPHY.semibold_10,
  },
  textButton: {
    width: 93,
    backgroundColor: COLORS.transparent,
    paddingHorizontal: 0,
  },
  name: {
    ...TYPOGRAPHY.bold_10_4,
    textTransform: 'uppercase',
  },
});
