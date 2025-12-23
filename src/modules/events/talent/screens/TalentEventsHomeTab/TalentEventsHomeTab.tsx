import { ScreenWrapper } from '@components';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppSearchInputPrimary, AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { EVENTS_CATEGORIES } from '../../../constants';
import { TalentEventsList } from '../../components';
import { goToScreen, Screens } from '@navigation';

export const TalentEventsHomeTab = () => {
  // Групуємо категорії по 4 елементи в рядок
  const groupedCategories = EVENTS_CATEGORIES.reduce(
    (
      acc: (typeof EVENTS_CATEGORIES)[],
      category: (typeof EVENTS_CATEGORIES)[0],
      index: number,
    ) => {
      const rowIndex = Math.floor(index / 4);
      if (!acc[rowIndex]) {
        acc[rowIndex] = [];
      }
      acc[rowIndex].push(category);
      return acc;
    },
    [] as (typeof EVENTS_CATEGORIES)[],
  );

  return (
    <ScreenWrapper
      headerVariant="withLogo"
      logoProps={{ width: 164, height: 34.5 }}
      headerStyles={{ backgroundColor: COLORS.black }}
      containerStyle={styles.container}
      customElement
      rightIcons={[
        {
          icon: () => ICONS.bell('white'),
          onPress: () => {},
          size: 20,
        },
      ]}
    >
      <TalentEventsList
        type="random"
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                onPress={() =>
                  goToScreen(Screens.TalentSearchEvents, { autofocus: true })
                }
                activeOpacity={0.8}
                style={styles.searchInputButton}
              >
                <AppSearchInputPrimary
                  containerStyle={styles.searchInput}
                  placeholder="Search events"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  goToScreen(Screens.TalentSearchEvents, { showFilter: true })
                }
                activeOpacity={0.8}
                style={styles.filterButton}
              >
                <SvgXml xml={ICONS.filter('black_80')} width={20} height={20} />
              </TouchableOpacity>
            </View>

            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScrollView}
              >
                {groupedCategories.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.categoriesRow}>
                    {row.map(category => (
                      <TouchableOpacity
                        key={category.id}
                        activeOpacity={0.8}
                        style={styles.categoryButton}
                      >
                        <View style={styles.categoryOverlay}>
                          <AppText typography="bold_14" color="white">
                            {category.name}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.listTitle}>
              <AppText typography="extra_bold_18" color="black">
                Dashboard
              </AppText>

              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AppText typography="regular_12" color="black">
                  View all
                </AppText>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </ScreenWrapper>
  );
};
