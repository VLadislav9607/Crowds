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
/**
 * Extract a bare hex/alphanumeric ID from strings like:
 *   "69bba7dbbd034e0002259ee0"          → as-is
 *   "document(id: \"69bba7dbbd034e0002259ee0\")" → extracted
 */
function extractId(value: unknown): string | undefined {
  if (!value || value === null) return undefined;
  const str = String(value);
  // Already a bare ID (hex, 10+ chars)?
  if (/^[a-f0-9]{10,}$/i.test(str)) return str;
  // Wrapped format: something(id: "...")
  const wrapped = str.match(/id:\s*"([a-f0-9]{10,})"/i);
  if (wrapped) return wrapped[1];
  // Fallback: find any long hex sequence
  const hex = str.match(/([a-f0-9]{10,})/i);
  return hex ? hex[1] : undefined;
}

function parseSdkResult(raw: unknown): {
  documentId?: string;
  livePhotoId?: string;
} {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;

  // Android format
  if (parsed?.ids?.documentIds) {
    return {
      documentId: extractId(parsed.ids.documentIds[0]),
      livePhotoId: extractId(parsed.livePhotoId),
    };
  }

  // iOS format — ids is a flat array of string representations
  if (Array.isArray(parsed?.ids)) {
    let documentId: string | undefined;
    let livePhotoId: string | undefined;

    for (const item of parsed.ids) {
      const str = typeof item === 'string' ? item : String(item);
      const id = extractId(str);
      if (!id) continue;

      if (/document/i.test(str)) {
        documentId = id;
      } else if (/livePhoto/i.test(str)) {
        livePhotoId = id;
      }
    }

    // iOS also has livePhotoId at top level (may be null/NSNull)
    if (!livePhotoId) {
      livePhotoId = extractId(parsed?.livePhotoId);
    }

    return { documentId, livePhotoId };
  }

  // Fallback: try top-level documentId / livePhotoId fields
  if (parsed?.documentId || parsed?.livePhotoId) {
    return {
      documentId: extractId(parsed.documentId),
      livePhotoId: extractId(parsed.livePhotoId),
    };
  }

  return {};
}

export const useIdentityVerification = (
  origin: VerificationOrigin = 'profile',
) => {
  const { me, talent } = useGetMe();
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
            name: 'outro',
            heading: 'All Done!',
            message: "We're now reviewing your submission. This usually takes a few moments.",
          },
        ],
      });

      if (outcome.status === 'success') {
        const { documentId, livePhotoId } = parseSdkResult(outcome.result);

        // Navigate immediately, create checks in background
        goToScreen(Screens.VerificationProcessing, { origin });

        createKycChecks({ clientId, documentId, livePhotoId }).catch(error => {
          console.error('[KYC] Failed to create checks:', error);
        });
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
        dob: talent?.birth_date || '2000-01-01',
        appId: APP_ID,
      });

      if (response?.clientId && response?.sdkToken) {
        await launchSdk(response.clientId, response.sdkToken);
      }
    } catch (error: any) {
      const message = error?.message || error?.error || 'Something went wrong';
      Alert.alert('Verification Error', message);
    }
  }, [userId, me, createKycSdkToken, launchSdk, talent?.birth_date]);

  return {
    goToVerification,
    isPending,
  };
};
