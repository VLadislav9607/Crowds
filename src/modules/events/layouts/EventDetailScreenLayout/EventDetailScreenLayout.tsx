import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenWithScrollWrapper } from '@components';
import { EventDetailHeader } from '../../components/EventDetailHeader';
import { IAppHeaderProps } from '@ui';
import { TalentFlag } from '@modules/common';

interface EventDetailScreenLayoutProps extends Omit<IAppHeaderProps, 'headerVariant'> {
  children: ReactNode;
  eventTitle?: string;
  eventLocation?: string;
  eventDate?: string;
  logoPath?: string;
  officeFlag?: TalentFlag;
}

export const EventDetailScreenLayout = ({
  children,
  eventTitle,
  eventLocation,
  eventDate,
  logoPath,
  officeFlag,
  ...headerProps
}: EventDetailScreenLayoutProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title={eventTitle}
      contentContainerStyle={{ paddingBottom: bottom || 24 }}
      customElement={
        <EventDetailHeader
          location={eventLocation}
          date={eventDate}
          logoPath={logoPath}
          officeFlag={officeFlag}
        />
      }
      {...headerProps}
    >
      {children}
    </ScreenWithScrollWrapper>
  );
};
