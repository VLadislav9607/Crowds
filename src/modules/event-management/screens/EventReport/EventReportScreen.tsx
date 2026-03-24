import { ActivityIndicator } from 'react-native';
import { If, NoAccess, ScreenWithScrollWrapper } from '@components';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { Screens, useScreenNavigation } from '@navigation';
import { useGetEventReport, useGetMe } from '@actions';
import { ReportStatsBoard, SuccessRatioChart } from '../../components';
import { styles } from './styles';

export const EventReportScreen = () => {
  const { organizationMember } = useGetMe();
  const hasAccess =
    !!organizationMember?.current_context?.capabilitiesAccess.view_events;

  const { params } = useScreenNavigation<Screens.EventReport>();
  const eventId = params?.eventId ?? '';
  const { data: report, isLoading } = useGetEventReport(eventId);

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
