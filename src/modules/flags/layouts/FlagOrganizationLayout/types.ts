import { ReactNode } from 'react';

export interface FlagOrganizationLayoutProps {
  children: ReactNode;
  eventId: string;
  brandName: string | null;
  brandLogoPath: string | null;
}
