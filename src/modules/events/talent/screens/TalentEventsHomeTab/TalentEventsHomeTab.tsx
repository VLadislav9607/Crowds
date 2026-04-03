import { ScreenWrapper, TestBadge } from '@components';
import { TouchableOpacity, View } from 'react-native';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppSearchInputPrimary, AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { CategoriesGrid, SearchEventsList } from '../../components';
import { goToScreen, Screens, TAB_BAR_TOTAL_HEIGHT } from '@navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationBellBadge } from '../../../../notifications';

export const TalentEventsHomeTab = () => {
  const { bottom } = useSafeAreaInsets();

  const bottomPadding = TAB_BAR_TOTAL_HEIGHT + bottom;

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
          element: <NotificationBellBadge color="white" size={20} />,
          onPress: () => goToScreen(Screens.Notifications),
          size: 20,
        },
      ]}
    >
      <SearchEventsList
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingBottom: bottomPadding },
        ]}
        emptyTextStyle={styles.emptyText}
        ListHeaderComponent={
          <>
            <TestBadge />

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

            <CategoriesGrid />

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
