import { TextInput, View, Pressable } from 'react-native';
import { useRef } from 'react';
import { AppSearchInputSecondaryProps } from './types';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { styles } from './styles';

export const AppSearchInputSecondary = ({
  containerStyle,
  iconWrapperStyle,
  ...props
}: AppSearchInputSecondaryProps) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable style={[styles.container, containerStyle]} onPress={handlePress}>
      <View style={[styles.leftIconWrapper, iconWrapperStyle]}>
        <SvgXml xml={ICONS.search('main')} width={24} height={24} />
      </View>

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search by keyword"
        numberOfLines={1}
        multiline={false}
        {...props}
      />
    </Pressable>
  );
};
