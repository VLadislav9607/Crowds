import { AppInput, AppText } from '@ui';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { styles } from './styles';
import { showErrorToast } from '@helpers';
import {
  BranchManagerEmailsStepProps,
  BranchManagerEmailsStepRef,
} from './types';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const BranchManagerEmailsStep = forwardRef<
  BranchManagerEmailsStepRef,
  BranchManagerEmailsStepProps
>(({ branches, defaultValues }, ref) => {
  const [branchManagerEmails, setBranchManagerEmails] = useState<
    Record<string, string>
  >(defaultValues?.branchManagerEmails ?? {});

  const onBranchManagerEmailChange = (countryCode: string, email: string) => {
    setBranchManagerEmails(prev => ({
      ...prev,
      [countryCode]: email,
    }));
  };

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: cb => {
        for (const country of branches) {
          const email = branchManagerEmails[country.code];

          if (!email || email.trim() === '') {
            showErrorToast(
              `Please enter branch manager email for ${country.name}`,
            );
            return;
          }

          if (!isValidEmail(email.trim())) {
            showErrorToast(
              `Please enter a valid email address for ${country.name}`,
            );
            return;
          }
        }

        cb({ branchManagerEmails });
      },
    }),
    [branchManagerEmails, branches],
  );

  return (
    <View>
      <AppText typography="bold_20" margin={{ bottom: 10 }}>
        Invite Decision Makers
      </AppText>

      <AppText typography="regular_14" margin={{ bottom: 16 }}>
        Enter the email addresses for each branch manager to invite them to join
        Crowds Now.
      </AppText>

      <View style={styles.branchesList}>
        {branches.map((country, index) => (
          <View key={country.code} style={styles.branch}>
            <View style={styles.branchHeader}>
              <View style={styles.branchInfo}>
                <CountryFlag isoCode={country.code} size={20} />
                <View>
                  <AppText typography="semibold_16" color="black">
                    {country.name}
                  </AppText>
                  <AppText typography="regular_14" color="gray_primary">
                    Branch {index + 1}
                  </AppText>
                </View>
              </View>
            </View>

            <AppInput
              placeholder="Branch manager email"
              value={branchManagerEmails[country.code] || ''}
              onChangeText={email =>
                onBranchManagerEmailChange(country.code, email)
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        ))}
      </View>
    </View>
  );
});
