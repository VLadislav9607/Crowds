import { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import { AppText, DashedLine } from '@ui';

import { useIdentityVerification } from '../../hooks';
import { IdentityVerificationRef } from './types';
import { styles } from './styles';

export const IdentityVerification = forwardRef<IdentityVerificationRef>(
  (_props, ref) => {
    const { goToVerification } = useIdentityVerification();

    useImperativeHandle(ref, () => ({
      onVerify: goToVerification,
    }));

    return (
      <View style={styles.container}>
        <AppText
          color="black"
          typography="regular_14"
          style={styles.textCenter}
        >
          Crowds Now cares about only offering talent to our customers who can
          be verified. Please note if your Birthdate does not match this; you
          will not be allowed access to the platform.
        </AppText>
        <AppText
          color="black"
          typography="regular_14"
          style={styles.textCenter}
          margin={{ top: 14, bottom: 57 }}
        >
          Currently access is only permitted to those over the age of 18.
        </AppText>

        <View style={styles.stepsRow}>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumberCircle}>
              <AppText color="white" typography="semibold_18">
                1
              </AppText>
            </View>

            <AppText
              color="main"
              typography="medium_12"
              style={styles.textCenter}
            >
              Upload{'\n'}Document
            </AppText>
          </View>
          <DashedLine
            strokeDasharray="3 3"
            containerStyle={styles.dashedLineContainer}
          />

          <View style={styles.stepContainer}>
            <View style={styles.stepNumberCircle}>
              <AppText color="white" typography="semibold_18">
                2
              </AppText>
            </View>

            <AppText
              color="main"
              typography="medium_12"
              style={styles.textCenter}
            >
              Upload Selfie
            </AppText>
          </View>

          <DashedLine
            strokeDasharray="3 3"
            containerStyle={styles.dashedLineContainer}
          />

          <View style={styles.stepContainer}>
            <View style={styles.stepNumberCircle}>
              <AppText color="white" typography="semibold_18">
                3
              </AppText>
            </View>

            <AppText
              color="main"
              typography="medium_12"
              style={styles.textCenter}
            >
              Get Verified
            </AppText>
          </View>
        </View>

        <AppText
          color="black_50"
          typography="regular_14"
          style={styles.textCenter}
          margin={{ top: 30, bottom: 14 }}
        >
          ID verification is permitted via Passports and or locally recognized
          formats (eg Drivers Licence or relevant equivalent).
        </AppText>
        <AppText
          color="black_50"
          typography="regular_14"
          style={styles.textCenter}
        >
          Please note that no international work is allowed without Passport
          Verification. If you don't verify with a Passport at this time; you
          will be able to add this later.
        </AppText>
      </View>
    );
  },
);
