import { useState, useCallback } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';

import { useGetMe } from '@actions';
import { AppCheckbox, AppText } from '@ui';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { supabase } from '@services';
import { Role } from '@modules/common';
import { TERMS_LINKS } from '@constants';

import { BlackOnboardingScreenLayout } from '../../layouts';
import { styles } from './styles';

const openLink = (url: string) => Linking.openURL(url);

export const TermsAgreementScreen = () => {
  const { params } = useScreenNavigation<Screens.TermsAgreement>();
  const origin = params!.origin;
  const { me, isTalent } = useGetMe();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!agreed || !me?.id) return;

    setIsLoading(true);
    try {
      const table = isTalent ? 'talents' : 'org_users';
      await supabase
        .from(table)
        .update({ terms_accepted_at: new Date().toISOString() })
        .eq('id', me.id);

      if (origin === 'talent_onboarding') {
        goToScreen(Screens.OnboardingAuthTalent);
      } else if (origin === 'org_onboarding') {
        goToScreen(Screens.Congratulations, { role: Role.ORGANIZATION });
      }
    } finally {
      setIsLoading(false);
    }
  }, [agreed, me?.id, isTalent, origin]);

  const buttons = [
    {
      title: 'I Agree & Confirm',
      isDisabled: !agreed,
      isLoading,
      onPress: handleConfirm,
    },
  ];

  return (
    <BlackOnboardingScreenLayout title="Terms & Conditions" buttons={buttons}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <AppText typography="regular_14" style={styles.text}>
          By registering you agree to our Terms and Conditions, NDA, and all
          policies listed below. Full details at{' '}
          <AppText
            typography="bold_14"
            color="white"
            style={styles.linkText}
            onPress={() => openLink('https://crowdsnow.com')}
          >
            crowdsnow.com
          </AppText>
        </AppText>

        <View style={styles.termsButtonsContainer}>
          {TERMS_LINKS.map(item => (
            <Pressable
              key={item.url}
              style={styles.termsButton}
              onPress={() => openLink(item.url)}
            >
              <AppText typography="bold_12" color="white">
                {item.label}
              </AppText>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.checkboxRow}>
        <AppCheckbox
          type="square"
          checked={agreed}
          color="white"
          colorChecked="white"
          onChange={setAgreed}
        />
        <AppText typography="regular_12" style={styles.text}>
          I have read and agree to all of the above policies, NDA, and Do not
          sell or share my personal information. I understand that violations
          may lead to disqualification and no payment.
        </AppText>
      </View>
    </BlackOnboardingScreenLayout>
  );
};
