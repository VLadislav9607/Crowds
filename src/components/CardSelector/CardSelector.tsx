import { COLORS, TYPOGRAPHY } from '@styles';
import { AppText } from '@ui';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Card {
  title: string;
  subtitle?: string;
  value: string;
}

interface CardSelectorProps {
  cards: Card[];
  cardStyles?: StyleProp<ViewStyle>;
  cardTextStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const CardSelector = ({
  cards,
  selectedValue,
  cardStyles = {},
  containerStyles = {},
  cardTextStyles = {},
  onSelect,
}: CardSelectorProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {cards.map(card => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={card.value}
          style={[
            styles.card,
            cardStyles,
            selectedValue === card.value && styles.selectedCard,
          ]}
          onPress={() => onSelect(card.value)}
        >
          <AppText
            style={[
              styles.title,
              cardTextStyles,
              selectedValue === card.value && styles.selectedCardText,
            ]}
          >
            {card.title}
          </AppText>
          {card.subtitle && (
            <AppText
              style={[
                styles.subtitle,
                selectedValue === card.value && styles.selectedCardText,
              ]}
            >
              {card.subtitle}
            </AppText>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: '100%',
  },
  card: {
    borderRadius: 23,
    backgroundColor: COLORS.white,
    padding: 10,
    borderColor: COLORS.main,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: COLORS.main,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  title: {
    ...TYPOGRAPHY.medium_16,
  },
  selectedCardText: {
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.regular_10,
    opacity: 0.6,
    marginTop: 10,
  },
});
