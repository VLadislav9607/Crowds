import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { styles } from './styles';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import { useGetFileUrl } from '@actions';
import { BucketsTypes } from '@configs';
import { If } from '@components';
import { COLORS } from '@styles';
import { AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';

export const PDFViewerScreen = () => {
  const { params } = useScreenNavigation<Screens.PDFViewer>();

  const pdfPath = params?.pdfPath;
  const bucket = params?.bucket;
  const title = params?.title || 'PDF Viewer';

  const { data: response, isLoading: isUrlLoading } = useGetFileUrl({
    bucket: bucket as BucketsTypes,
    path: pdfPath || undefined,
  });

  const url = params?.url || response?.url;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText color="black" typography="bold_16">
          {title}
        </AppText>

        <TouchableOpacity onPress={goBack}>
          <SvgXml xml={ICONS.closeIcon('black', 0.6)} width={16} height={16} />
        </TouchableOpacity>
      </View>
      <If condition={isUrlLoading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      </If>
      <If condition={!isUrlLoading}>
        <Pdf source={{ uri: url }} style={styles.pdf} />

        {/* <Pdf
  source={{ uri: url }}
  style={{ flex: 1, width: "100%" }}
  fitPolicy={2}          // 0: fit width, 1: fit height, 2: fit both (залежить від версії)
  scale={1.0}            // стартовий масштаб
  minScale={1.0}
  maxScale={4.0}
  enablePaging={true}    // свайп сторінками (як Pages)
  spacing={8}            // відступ між сторінками
  horizontal={false}
  onError={(e) => console.log(e)}
/> */}
      </If>
    </View>
  );
};
