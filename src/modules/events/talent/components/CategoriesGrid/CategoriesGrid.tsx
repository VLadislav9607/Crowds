import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { IMAGES } from '@assets';
import { goToScreen, Screens } from '@navigation';
import { useGetEventsCategories } from '@actions';

export const CategoriesGrid = () => {
  const { data: categoriesData } = useGetEventsCategories();
  const categories = categoriesData?.categories ?? [];

  const groupedCategories = categories.reduce(
    (
      acc: (typeof categories)[],
      category: (typeof categories)[0],
      index: number,
    ) => {
      const rowIndex = Math.floor(index / 3);
      if (!acc[rowIndex]) {
        acc[rowIndex] = [];
      }
      acc[rowIndex].push(category);
      return acc;
    },
    [] as (typeof categories)[],
  );

  if (!categories.length) return null;

  return (
    <View style={styles.grid}>
      {groupedCategories.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(category => {
            const image =
              IMAGES.categories[
                category.title as keyof typeof IMAGES.categories
              ];
            return (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.8}
                style={styles.button}
                onPress={() =>
                  goToScreen(Screens.TalentSearchEvents, {
                    categoryId: category.id,
                    categoryName: category.title,
                  })
                }
              >
                {image && (
                  <ImageBackground
                    source={image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.overlay}>
                  <AppText typography="bold_14" color="white">
                    {category.title}
                  </AppText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 12,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    borderWidth: 6,
    borderColor: COLORS.black,
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.light_purple,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    backgroundColor: COLORS.black_50,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
