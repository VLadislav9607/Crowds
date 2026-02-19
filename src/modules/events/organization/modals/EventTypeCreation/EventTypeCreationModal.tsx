import { useState } from 'react';
import { AppModal, CardSelector } from '@components';
import { goToScreen, Screens } from '@navigation';
import { StyleSheet } from 'react-native';

interface EventTypeCreationModal {
  isVisible: boolean;
  onClose: () => void;
}

export const EventTypeCreationModal = ({
  isVisible,
  onClose,
}: EventTypeCreationModal) => {
  const [selectedType, setSelectedType] = useState<
    'media_production' | 'brand_activation'
  >('brand_activation');

  const handleSelect = (value: string) => {
    const eventType = value as 'media_production' | 'brand_activation';
    setSelectedType(eventType);
    onClose();

    setTimeout(() => {
      goToScreen(Screens.CreateEvent, { eventType });
    }, 300);
  };

  return (
    <AppModal
      title="What type of event are you creating?"
      titleProps={{ typography: 'h3_mob', style: { marginBottom: 24 } }}
      isVisible={isVisible}
      onClose={onClose}
    >
      <CardSelector
        cardStyles={styles.cardSelector}
        cards={[
          {
            title: "I need extra's for Film/TV/Concert Event or Similar",
            value: 'media_production',
          },
          {
            title: 'I need a crowd to elevate my business, service, product',
            value: 'brand_activation',
          },
        ]}
        selectedValue={selectedType}
        onSelect={handleSelect}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  cardSelector: {
    paddingVertical: 32,
  },
});
