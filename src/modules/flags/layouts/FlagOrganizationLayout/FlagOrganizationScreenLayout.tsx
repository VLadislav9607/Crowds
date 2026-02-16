import { View } from 'react-native';
import { ScreenWithScrollWrapper, AppImage, If } from '@components';
import { AppText } from '@ui';

import { styles } from './styles';
import { FlagOrganizationLayoutProps } from './types';

export const FlagOrganizationScreenLayout = ({
  children,
  brandName,
  brandLogoPath,
}: FlagOrganizationLayoutProps) => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      title="Flag organization"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.orgInfoSection}>
        <If condition={!!brandLogoPath}>
          <AppImage
            imgPath={brandLogoPath}
            bucket="organizations_avatars"
            containerStyle={styles.orgLogo}
          />
        </If>
        <View style={styles.orgDetails}>
          <If condition={!!brandName}>
            <AppText typography="extra_bold_22">{brandName}</AppText>
          </If>
        </View>
      </View>

      {children}
    </ScreenWithScrollWrapper>
  );
};
