import { If, ScreenWrapper } from '@components';
import { TouchableOpacity, View } from 'react-native';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppSearchInputPrimary, AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { SearchEventsList } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TalentEventsFilterData, TalentEventsFilterModal } from '../../modals';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Screens, useScreenNavigation } from '@navigation';
import { useDebounce } from '@hooks';
import { useGetMe } from '@actions';
import { convertFiltersToSearchParams } from '../../components/SearchEventsList/helpers';

export const TalentSearchEventsScreen = () => {
  const insets = useSafeAreaInsets();
  const { params } = useScreenNavigation<Screens.TalentSearchEvents>();
  const [searchValue, setSearchValue] = useState('');

  const [filters, setFilters] = useState<TalentEventsFilterData>({});

  const filterModalRef = useRef<BottomSheetModal<null>>(null);

  const debouncedSearchValue = useDebounce(searchValue, 450);

  // Отримуємо локацію профілю користувача
  const { data: me } = useGetMe();
  const profileLocation = useMemo(
    () =>
      me?.talent?.talent_location
        ? {
            latitude: me.talent.talent_location.latitude,
            longitude: me.talent.talent_location.longitude,
          }
        : null,
    [me?.talent?.talent_location],
  );

  // Конвертуємо фільтри в параметри для запиту
  const searchFilters = useMemo(() => {
    const convertedFilters = convertFiltersToSearchParams(
      filters,
      profileLocation,
    );
    return {
      ...convertedFilters,
      search_query: debouncedSearchValue || undefined,
    };
  }, [filters, profileLocation, debouncedSearchValue]);

  // Підраховуємо кількість активних фільтрів (без search_query)
  const filtersCount = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

  const handleOpenFilterModal = () => {
    filterModalRef.current?.present();
  };

  useEffect(() => {
    params?.showFilter && filterModalRef.current?.present();
  }, [params?.showFilter]);

  return (
    <ScreenWrapper
      headerVariant="withLogo"
      logoProps={{ width: 164, height: 34.5 }}
      containerStyle={styles.container}
      headerStyles={{ backgroundColor: COLORS.black }}
      rightIcons={[
        {
          icon: () => ICONS.bell('white'),
          onPress: () => {},
          size: 20,
        },
      ]}
    >
      <View style={styles.searchContainer}>
        <AppSearchInputPrimary
          containerStyle={styles.searchInput}
          placeholder="Search events"
          autoFocus={params?.autofocus}
          value={searchValue}
          onChangeText={setSearchValue}
        />

        <TouchableOpacity
          onPress={handleOpenFilterModal}
          activeOpacity={0.8}
          style={[
            styles.filterButton,
            !!filtersCount && styles.filterButtonActive,
          ]}
        >
          <SvgXml xml={ICONS.filter('black_80')} width={20} height={20} />

          <If condition={!!filtersCount}>
            <View style={styles.filterButtonCounter}>
              <AppText typography="bold_12" color="white">
                {filtersCount}
              </AppText>
            </View>
          </If>
        </TouchableOpacity>
      </View>

      <SearchEventsList
        filters={searchFilters}
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingBottom: insets.bottom || 24 },
        ]}
      />

      <TalentEventsFilterModal
        bottomSheetRef={filterModalRef}
        onApply={setFilters}
      />
    </ScreenWrapper>
  );
};
