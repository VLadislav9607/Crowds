import { View } from 'react-native';
import { AppText } from '@ui';

import { styles } from './styles';

export interface PhysicalDetail {
  label: string;
  value: string;
  color?: string;
}

interface PhysicalDetailsListProps {
  details: PhysicalDetail[];
}

export const PhysicalDetailsList = ({ details }: PhysicalDetailsListProps) => {
  return (
    <View style={styles.container}>
      {details.map((detail, index) => (
        <View key={index} style={styles.chip}>
          <AppText typography="regular_14" color="grayscale_500">
            {detail.label} -{' '}
          </AppText>
          {detail.color && (
            <View
              style={[styles.colorBox, { backgroundColor: detail.color }]}
            />
          )}
          <AppText typography="regular_14" color="black">
            {detail.value}
          </AppText>
        </View>
      ))}
    </View>
  );
};
