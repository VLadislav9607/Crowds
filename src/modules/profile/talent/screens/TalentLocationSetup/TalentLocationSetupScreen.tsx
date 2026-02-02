import { ScreenWithScrollWrapper } from '@components';
import {
  TalentLocationSetupForm,
  TalentLocationSetupFormRef,
} from '../../forms';
import { styles } from './styles';
import { AppButton } from '@ui';
import { useRef, useState } from 'react';
import { goBack } from '@navigation';

export const TalentLocationSetupScreen = () => {
  const locationSetupFormRef = useRef<TalentLocationSetupFormRef>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    locationSetupFormRef.current?.handleSubmit();
  };
  const handleSuccess = () => {
    goBack();
  };

  return (
    <ScreenWithScrollWrapper
      title="My Location"
      headerVariant="withTitle"
      contentContainerStyle={styles.container}
      headerStyles={styles.headerStyles}
      footerStyle={styles.footerStyle}
      footer={
        <AppButton
          title="Next"
          onPress={handleSubmit}
          isLoading={isSubmitting}
        />
      }
    >
      <TalentLocationSetupForm
        ref={locationSetupFormRef}
        onFormStateChange={val => setIsSubmitting(val.isUpsertingLocation)}
        onSuccess={handleSuccess}
      />
    </ScreenWithScrollWrapper>
  );
};
