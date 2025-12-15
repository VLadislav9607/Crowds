import { Dimensions, Image, StyleSheet } from 'react-native';

import { AppModal } from '@components';

interface ImagePreviewModalProps {
  isVisible: boolean;
  imageUri: string;
  onClose: () => void;
}

export const ImagePreviewModal = ({
  isVisible,
  imageUri,
  onClose,
}: ImagePreviewModalProps) => {
  return (
    <AppModal isVisible={isVisible} onClose={onClose}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    borderRadius: 20,
  },
});
