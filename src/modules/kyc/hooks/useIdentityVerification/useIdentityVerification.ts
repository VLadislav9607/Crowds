import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useCreateKycSdkToken, useCreateKycChecks, useGetMe } from '@actions';
import { startSafe } from '@complycube/react-native';
import { APP_ID } from '@constants';
import { goToScreen, Screens } from '@navigation';

type VerificationOrigin = 'talent_onboarding' | 'org_onboarding' | 'profile';

/**
 * Extract documentId and livePhotoId from SDK result.
 *
 * Android returns: { livePhotoId: "...", ids: { documentIds: ["..."], poaIds: [] } }
 * iOS returns:     { livePhotoId: null, ids: ["document(id: \"...\")", "livePhoto(id: \"...\")"] }
 */
function parseSdkResult(raw: unknown): {
  documentId?: string;
  livePhotoId?: string;
} {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;

  // Android format
  if (parsed?.ids?.documentIds) {
    return {
      documentId: parsed.ids.documentIds[0],
      livePhotoId: parsed.livePhotoId || undefined,
    };
  }

  // iOS format — ids is a flat array of string representations
  if (Array.isArray(parsed?.ids)) {
    let documentId: string | undefined;
    let livePhotoId: string | undefined;

    for (const item of parsed.ids) {
      const str = typeof item === 'string' ? item : String(item);
      // Extract hex ID from patterns like: document(id: "abc123") or livePhoto(id: "abc123")
      const idMatch = str.match(/([a-f0-9]{10,})/i);
      if (!idMatch) continue;

      if (/document/i.test(str)) {
        documentId = idMatch[1];
      } else if (/livePhoto/i.test(str)) {
        livePhotoId = idMatch[1];
      }
    }

    // iOS also has livePhotoId at top level (may be null/NSNull)
    if (!livePhotoId && parsed?.livePhotoId && parsed.livePhotoId !== null) {
      livePhotoId = String(parsed.livePhotoId);
    }

    return { documentId, livePhotoId };
  }

  return {};
}

export const useIdentityVerification = (origin: VerificationOrigin = 'profile') => {
  const { me } = useGetMe();
  const { mutateAsync: createKycSdkToken, isPending } = useCreateKycSdkToken();
  const { mutateAsync: createKycChecks } = useCreateKycChecks();

  const userId = me?.id || '';

  const launchSdk = useCallback(
    async (clientId: string, sdkToken: string) => {
      const outcome = await startSafe({
        clientID: clientId,
        clientToken: sdkToken,
        lookAndFeel: {
          // iOS keys
          primaryButtonBgColor: '#430B70',
          primaryButtonPressedBgColor: '#65558F',
          primaryButtonTextColor: '#FFFFFF',
          linkButtonTextColor: '#430B70',
          documentTypeSelectorIconColor: '#430B70',
        },
        stages: [
          'intro',
          'documentCapture',
          { name: 'faceCapture', options: { type: 'photo' } },
          {
            name: 'completion',
            options: { message: "All done! We're now reviewing your submission." },
          },
        ],
      });

      if (outcome.status === 'success') {
        try {
          const { documentId, livePhotoId } = parseSdkResult(outcome.result);
          await createKycChecks({ clientId, documentId, livePhotoId });
          goToScreen(Screens.VerificationProcessing, { origin });
        } catch (error) {
          console.error('[KYC] Failed to create checks:', error);
          Alert.alert(
            'Verification Error',
            'Failed to submit verification. Please try again.',
          );
        }
      }
    },
    [createKycChecks, origin],
  );

  const goToVerification = useCallback(async () => {
    try {
      const response = await createKycSdkToken({
        userId,
        firstName: me?.first_name || '',
        lastName: me?.last_name || '',
        dob: '2000-01-01',
        appId: APP_ID,
      });

      if (response?.clientId && response?.sdkToken) {
        await launchSdk(response.clientId, response.sdkToken);
      }
    } catch (error: any) {
      const message = error?.message || error?.error || 'Something went wrong';
      Alert.alert('Verification Error', message);
    }
  }, [userId, me, createKycSdkToken, launchSdk]);

  return {
    goToVerification,
    isPending,
  };
};
