import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';

interface IProps {
  children: ReactNode;
  eventTitle: string;
}

export const ManageEventScreenLayout = ({
  children,
  eventTitle,
}: IProps) => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      headerImageBg="crowd"
      title={eventTitle ? `Manage "${eventTitle}"` : 'Manage Event'}
      contentContainerStyle={styles.contentContainer}
    >
      {children}
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 32,
    flexGrow: 1,
  },
});
