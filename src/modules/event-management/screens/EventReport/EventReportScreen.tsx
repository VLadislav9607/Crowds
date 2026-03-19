import { ActivityIndicator } from 'react-native';
import { ScreenWithScrollWrapper } from '@components';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { Screens, useScreenNavigation } from '@navigation';
import { useGetEventReport } from '@actions';
import { ReportStatsBoard, SuccessRatioChart } from '../../components';
import { styles } from './styles';

export const EventReportScreen = () => {
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
    </ScreenWithScrollWrapper>
  );
};
