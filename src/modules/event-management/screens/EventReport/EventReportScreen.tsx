import { ActivityIndicator, View } from 'react-native';
import { If, NoAccess, ScreenWithScrollWrapper } from '@components';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { Screens, useScreenNavigation } from '@navigation';
import { useGetEventReport, useGetMe, useGetEventPayment } from '@actions';
import { ReportStatsBoard, SuccessRatioChart } from '../../components';
import { styles } from './styles';

const formatCents = (cents: number) => {
  return (cents / 100).toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const EventReportScreen = () => {
  const { organizationMember } = useGetMe();
  const hasAccess =
    !!organizationMember?.current_context?.capabilitiesAccess.view_events;

  const { params } = useScreenNavigation<Screens.EventReport>();
  const eventId = params?.eventId ?? '';
  const { data: report, isLoading } = useGetEventReport(eventId);
  const { data: payment } = useGetEventPayment(eventId);

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      headerImageBg="crowd"
      title="Event Report"
      contentContainerStyle={styles.contentContainer}
    >
      <If condition={hasAccess}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.main} size="large" />
        ) : (
          <>
            <ReportStatsBoard report={report} />

            <If condition={!!payment}>
              <View style={styles.escrowCard}>
                <AppText typography="regular_14" color="black">
                  Total Funded for this Event
                </AppText>
                <View style={styles.escrowAmountRow}>
                  <AppText typography="extra_bold_26" color="main">
                    {formatCents(payment?.total_charge_cents ?? 0)}
                  </AppText>
                  <AppText
                    typography="regular_14"
                    color="gray"
                    style={styles.escrowCurrency}
                  >
                    AUD
                  </AppText>
                </View>
              </View>
            </If>

            <AppText
              typography="extra_bold_18"
              color="black"
              style={styles.sectionTitle}
            >
              Success Ratio of this event
            </AppText>
            <SuccessRatioChart report={report} />
          </>
        )}
      </If>
      <If condition={!hasAccess}>
        <NoAccess />
      </If>
    </ScreenWithScrollWrapper>
  );
};
