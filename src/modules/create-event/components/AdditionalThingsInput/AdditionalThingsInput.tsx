import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { AppInput, AppText, IconButton } from '@ui';

import { styles, MAX_CHARACTERS } from './styles';

interface AdditionalThingsInputProps {
  items: string[];
  onItemsChange: (items: string[]) => void;
}

export const AdditionalThingsInput = ({
  items,
  onItemsChange,
}: AdditionalThingsInputProps) => {
  const handleAdd = () => {
    onItemsChange([...items, '']);
  };

  const handleChange = (index: number, text: string) => {
    if (text.length <= MAX_CHARACTERS) {
      onItemsChange(items.map((item, i) => (i === index ? text : item)));
    }
  };

  const handleRemove = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
        activeOpacity={0.7}
      >
        <SvgXml xml={ICONS.plus('main')} width={16} height={16} />
        <AppText typography="bold_14" color="main">
          ADD ADDITIONAL THINGS
        </AppText>
      </TouchableOpacity>

      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <AppInput
            value={item}
            onChangeText={text => handleChange(index, text)}
            placeholder="Eg: Wears cat-eye specs, earrings, etc..."
            containerStyle={styles.inputContainer}
          />
          <IconButton
            icon={ICONS.trash()}
            iconSize={20}
            onPress={() => handleRemove(index)}
          />
        </View>
      ))}
    </View>
  );
};
