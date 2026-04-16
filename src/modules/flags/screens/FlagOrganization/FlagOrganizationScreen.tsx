import { View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Screens, useScreenNavigation } from '@navigation';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { supabase } from '@services';
import { useGetMe } from '@actions';

import { FlagOrganizationScreenLayout } from '../../layouts';
import { FlagOrganizationForm } from '../../forms';
import { FlagNotesList } from '../../components';
import { useOrgFlagsNotes } from '../../hooks';

export const FlagOrganizationScreen = () => {
  const { params } = useScreenNavigation<Screens.FlagOrganization>();

  const officeId = params?.officeId ?? '';
  const eventId = params?.eventId ?? '';

  const { notes, isLoading } = useOrgFlagsNotes(officeId);
  const { data: me } = useGetMe();
  const talentId = me?.talent?.id;

  const { data: existingReport } = useQuery({
    queryKey: ['flag_report_check', talentId, eventId],
    queryFn: async () => {
      const { data } = await supabase
        .from('flag_reports')
        .select('id')
        .eq('reporter_talent_id', talentId!)
        .eq('event_id', eventId)
        .eq('target_type', 'organization')
        .maybeSingle();
      return data;
    },
    enabled: !!talentId && !!eventId,
  });

  const alreadyFlagged = !!existingReport;

  return (
    <FlagOrganizationScreenLayout
      eventId={eventId}
      brandName={params?.brandName ?? null}
      brandLogoPath={params?.brandLogoPath ?? null}
    >
      {alreadyFlagged ? (
        <View style={styles.alreadyFlaggedContainer}>
          <AppText typography="bold_14" style={styles.alreadyFlaggedTitle}>
            You have already applied for a flag against this organisation for
            this event, another flag cannot be applied.
          </AppText>
          <View style={styles.safetyNoteContainer}>
            <AppText typography="regular_12" style={styles.safetyNoteText}>
              <AppText typography="bold_12">Note: </AppText>
              If you have safety concerns please contact us at{' '}
              <AppText typography="bold_12">privacy@crowdsnow.com</AppText> with{' '}
              <AppText typography="bold_12">Safety</AppText> in the subject
              line. If you use this email to contact us for anything else other
              than safety and privacy issues your profile may be suspended or
              banned.
            </AppText>
          </View>
        </View>
      ) : (
        <>
          <FlagOrganizationForm eventId={eventId} />
          <FlagNotesList notes={notes} isLoading={isLoading} />
        </>
      )}
    </FlagOrganizationScreenLayout>
  );
};

const styles = StyleSheet.create({
  alreadyFlaggedContainer: {
    gap: 16,
  },
  alreadyFlaggedTitle: {
    color: COLORS.black,
  },
  safetyNoteContainer: {
    backgroundColor: COLORS.black_10,
    borderRadius: 8,
    padding: 12,
  },
  safetyNoteText: {
    color: COLORS.black,
    lineHeight: 18,
  },
});
