import { Screens, useScreenNavigation } from '@navigation';

import { FlagOrganizationScreenLayout } from '../../layouts';
import { FlagOrganizationForm } from '../../forms';
import { FlagNotesList } from '../../components';
import { useOrgFlagsNotes } from '../../hooks';

export const FlagOrganizationScreen = () => {
  const { params } = useScreenNavigation<Screens.FlagOrganization>();

  const officeId = params?.officeId ?? '';
  const { notes, brandId, isLoading } = useOrgFlagsNotes(officeId);

  return (
    <FlagOrganizationScreenLayout
      eventId={params?.eventId ?? ''}
      brandName={params?.brandName ?? null}
      brandLogoPath={params?.brandLogoPath ?? null}
    >
      <FlagOrganizationForm
        eventId={params?.eventId ?? ''}
        brandId={brandId}
      />

      <FlagNotesList notes={notes} isLoading={isLoading} />
    </FlagOrganizationScreenLayout>
  );
};
