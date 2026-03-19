import { View } from 'react-native';
import { AppText } from '@ui';
import { getReportBoardConfig } from './config';
import { IReportStatsBoardProps } from './types';
import { styles } from './styles';

export const ReportStatsBoard = ({ report }: IReportStatsBoardProps) => {
  const stats = getReportBoardConfig(report);

  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <View
          key={index}
          style={[
            styles.boardItem,
            {
              backgroundColor: item.bgColor,
              borderColor: item.borderColor,
              borderWidth: item.borderWidth || 0,
            },
          ]}
        >
          <AppText style={[styles.boardValue, { color: item.textColor }]}>
            {item.value}
          </AppText>
          <AppText style={[styles.boardLabel, { color: item.textColor }]}>
            {item.label}
          </AppText>
        </View>
      ))}
    </View>
  );
};
