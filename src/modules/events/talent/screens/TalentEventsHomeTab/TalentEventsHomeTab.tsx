import { ScreenWrapper } from '@components';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppSearchInputPrimary, AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { SearchEventsList } from '../../components';
import { goToScreen, Screens, TAB_BAR_TOTAL_HEIGHT } from '@navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetEventsCategories } from '@actions';

export const TalentEventsHomeTab = () => {
  const { bottom } = useSafeAreaInsets();
  const { data: categoriesData } = useGetEventsCategories();

  const bottomPadding = TAB_BAR_TOTAL_HEIGHT + bottom;

  const categories = categoriesData?.categories ?? [];

  // Групуємо категорії по 4 елементи в рядок
  const groupedCategories = categories.reduce(
    (
      acc: (typeof categories)[],
      category: (typeof categories)[0],
      index: number,
    ) => {
      const rowIndex = Math.floor(index / 4);
      if (!acc[rowIndex]) {
        acc[rowIndex] = [];
      }
      acc[rowIndex].push(category);
      return acc;
    },
    [] as (typeof categories)[],
  );

  return (
    <ScreenWrapper
      headerVariant="withLogo"
      logoProps={{ width: 164, height: 34.5 }}
      headerStyles={{ backgroundColor: COLORS.black }}
      containerStyle={styles.container}
      customElement
      withBottomTabBar={true}
      rightIcons={[
        {
          icon: () => ICONS.bell('white'),
          onPress: () => {},
          size: 20,
        },
      ]}
    >
      <SearchEventsList
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingBottom: bottomPadding },
        ]}
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

            <View style={{ flexDirection: 'row' }}>
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
                        onPress={() =>
                          goToScreen(Screens.TalentSearchEvents, {
                            categoryId: category.id,
                            categoryName: category.title,
                          })
                        }
                      >
                        <View style={styles.categoryOverlay}>
                          <AppText typography="bold_14" color="white">
                            {category.title}
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

      {/* <TalentEventsViewList 
      data={[]}
      refetch={async () => {}}
         contentContainerStyle={[
          styles.listContentContainer,
          { paddingBottom: bottomPadding },
        ]}
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
      
      /> */}
    </ScreenWrapper>
  );
};
