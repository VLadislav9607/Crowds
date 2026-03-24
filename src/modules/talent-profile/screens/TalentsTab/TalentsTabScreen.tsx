import { useState, useMemo, useCallback, useRef } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenWrapper, AppFlashList, If, NoAccess } from '@components';
import { TalentProfileRow, TalentsListSkeleton } from '@modules/common';
import { SearchWithFilter } from '@ui';
import { useGetAllTalents, useGetMe } from '@actions';
import { goToScreen, Screens } from '@navigation';
import { useDebounce } from '@hooks';
import {
  FilterTalentsModal,
  FiltersState,
} from '../../../invite-talents/modals';
import { mapTalentToParticipant } from './helpers';

export const TalentsTabScreen = () => {
  const { organizationMember } = useGetMe();
  const hasAccess =
    !!organizationMember?.current_context?.capabilitiesAccess
      .recruit_applicants;

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState | null>(null);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllTalents({
      search: debouncedSearch,
      filters,
    });

  const talents = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.data.map(mapTalentToParticipant));
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const handleApplyFilters = (appliedFilters: FiltersState | null) => {
    setFilters(appliedFilters);
    const count = appliedFilters
      ? Object.keys(appliedFilters).filter(
          key => appliedFilters[key as keyof FiltersState] !== undefined,
        ).length
      : 0;
    setActiveFiltersCount(count);
  };

  const skeleton = isLoading ? <TalentsListSkeleton /> : undefined;

  return (
    <ScreenWrapper
      showBackButton={false}
      headerVariant="withTitleAndImageBg"
      withBottomTabBar={true}
      title="Talents"
      titleProps={{ style: styles.title }}
      contentContainerStyle={styles.contentContainer}
    >
      <If condition={hasAccess}>
        <SearchWithFilter
          searchValue={search}
          onSearchChange={setSearch}
          placeholder="Search talents..."
          activeFiltersCount={activeFiltersCount}
          onFilterPress={() => {
            Keyboard.dismiss();
            filterModalRef.current?.present();
          }}
          containerStyle={styles.searchInput}
        />

        <AppFlashList
          data={talents}
          emptyText="No talents found"
          gap={0}
          withBottomTab
          showBottomLoader={isFetchingNextPage}
          skeleton={skeleton}
          renderItem={({ item }) => (
            <TalentProfileRow
              talent={item}
              showMenu={false}
              onPressCard={() =>
                goToScreen(Screens.TalentProfile, {
                  talentId: item.talentId,
                })
              }
            />
          )}
          onEndReached={hasNextPage ? handleEndReached : undefined}
        />

        <FilterTalentsModal
          bottomSheetRef={filterModalRef}
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
          hideDistance
        />
      </If>
      <If condition={!hasAccess}>
        <NoAccess />
      </If>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 12,
  },
});
