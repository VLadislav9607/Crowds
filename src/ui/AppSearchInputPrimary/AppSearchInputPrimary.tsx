import { TextInput, Pressable } from 'react-native';
import { useRef } from 'react';
import { AppSearchInputPrimaryProps } from './types';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { styles } from './styles';

export const AppSearchInputPrimary = ({
  containerStyle,
  ...props
}: AppSearchInputPrimaryProps) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable style={[styles.container, containerStyle]} onPress={handlePress}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search by keyword"
        numberOfLines={1}
        multiline={false}
        {...props}
      />

      <SvgXml
        xml={ICONS.searchShort('main')}
        width={20}
        height={20}
        style={styles.icon}
      />
    </Pressable>
  );
};
