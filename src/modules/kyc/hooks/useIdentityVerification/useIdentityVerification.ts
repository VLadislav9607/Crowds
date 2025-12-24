import { useCreateKycSession, useGetMe } from '@actions';
import { goToScreen, Screens } from '@navigation';

export const useIdentityVerification = () => {
  const { me } = useGetMe();
  const { mutateAsync: createKycSession, isPending } = useCreateKycSession();

  const goToVerification = async () => {
    const userId = me?.id || '';
    const response = await createKycSession({
      userId,
      firstName: me?.first_name || '',
      lastName: me?.last_name || '',
      dob: '2000-01-01',
    });

    if (response?.redirectUrl) {
      return goToScreen(Screens.VerificationPerson, {
        url: response.redirectUrl,
        userId,
      });
    }
  };

  return {
    goToVerification,
    isPending,
  };
};
