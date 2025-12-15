import { If, ScreenWrapper } from '@components';
import { TouchableOpacity, View } from 'react-native';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppSearchInputPrimary, AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { TalentEventsList } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TalentEventsFilterData, TalentEventsFilterModal } from '../../modals';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Screens, useScreenNavigation } from '@navigation';

export const TalentSearchEventsScreen = () => {
  const insets = useSafeAreaInsets();
  const { params } = useScreenNavigation<Screens.TalentSearchEvents>();

  const [filters, setFilters] = useState<TalentEventsFilterData>({});

  const filtersCount = Object.keys(filters).length;

  const filterModalRef = useRef<BottomSheetModal<null>>(null);

  const handleOpenFilterModal = () => {
    filterModalRef.current?.present();
  };


  useEffect(()=>{
   params?.showFilter && filterModalRef.current?.present();
  },[params?.showFilter])

  return (
    <ScreenWrapper
      headerVariant="withLogo"
      logoProps={{ width: 164, height: 34.5 }}
      containerStyle={styles.container}
      headerStyles={{ backgroundColor: COLORS.black }}
      rightIcons={[
        {
          icon: () => ICONS.bell('white'),
          onPress: () => { },
          size: 20
        },
      ]}
    >

      <TalentEventsList
        contentContainerStyle={[styles.listContentContainer, { paddingBottom: insets.bottom || 24 }]}
        ListHeaderComponent={<>
          <View style={styles.searchContainer}>
            <AppSearchInputPrimary
              containerStyle={styles.searchInput}
              placeholder='Search events'
              autoFocus={params?.autofocus}
            />

            <TouchableOpacity onPress={handleOpenFilterModal} activeOpacity={0.8} style={[styles.filterButton, !!filtersCount && styles.filterButtonActive]}>
              <SvgXml xml={ICONS.filter('black_80')} width={20} height={20} />

              <If condition={!!filtersCount}>
                <View style={styles.filterButtonCounter}>
                  <AppText typography='bold_12' color='white'>{filtersCount}</AppText>
                </View>

              </If>
            </TouchableOpacity>
          </View>
        </>}
      />

      <TalentEventsFilterModal
        bottomSheetRef={filterModalRef}
        onApply={setFilters}
      />

    </ScreenWrapper>
  );
};
