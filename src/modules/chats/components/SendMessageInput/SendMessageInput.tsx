import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { styles } from './styles';

export const SendMessageInput = () => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState('');

  const handleChange = (text: string) => {
    setMessage(text);
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom || 16 }]}>
      <TextInput
        placeholder="Type your message"
        style={styles.input}
        value={message}
        onChangeText={handleChange}
      />
    </View>
  );
};
