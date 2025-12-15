import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { TalentEventsListProps } from './types';
import { TalentEventCardCompact } from '../TalentEventCardCompact';
import { COLORS } from '@styles';
import { AppText } from '@ui';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { styles } from './styles';
import { TalentEventAlreadyBookedModal, TalentEventUnavailableTimeModal, TalentEventApplyConfirmModal } from '../../modals';
import { useTalentEventsList } from './useTalentEventsList';


export const TalentEventsList = ({ type, ...props }: TalentEventsListProps) => {

    const { unavailableTimeModalRef, alreadyBookedModalRef, applyConfirmModalRef, hasMoreItems, isLoading } = useTalentEventsList();

    const renderItem = () => <TalentEventCardCompact containerStyle={styles.itemContainer} type={type} />;
    const renderItemSeparator = () => <View style={styles.itemSeparator} />;
    const renderFooterLoader = () => <View style={styles.footerLoader} >
        <ActivityIndicator size="small" color={COLORS.black} />
    </View>;


    const renderEmptyList = () => <View style={styles.emptyList} >
        <AppText typography='regular_14' color='black'>No events found</AppText>
    </View>;


    const renderSkeletonList = () => <View style={styles.skeletonListContainer} >
        <SkeletonPlaceholder>
            <View style={styles.skeletonItemsContainer}>
                <SkeletonPlaceholder.Item width={'100%'} height={176} borderRadius={10} />
                <SkeletonPlaceholder.Item width={'100%'} height={176} borderRadius={10} />
                <SkeletonPlaceholder.Item width={'100%'} height={176} borderRadius={10} />
                <SkeletonPlaceholder.Item width={'100%'} height={176} borderRadius={10} />
                <SkeletonPlaceholder.Item width={'100%'} height={176} borderRadius={10} />
            </View>
        </SkeletonPlaceholder>
    </View>


    return (
        <>
            <FlashList
                data={isLoading ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                ItemSeparatorComponent={renderItemSeparator}
                ListEmptyComponent={() => isLoading ? renderSkeletonList() : renderEmptyList()}
                ListFooterComponent={() => hasMoreItems && !isLoading ? renderFooterLoader() : null}
                {...props}
            />

            <TalentEventUnavailableTimeModal
                ref={unavailableTimeModalRef}
            />

            <TalentEventAlreadyBookedModal
                ref={alreadyBookedModalRef}
            />

            <TalentEventApplyConfirmModal
                ref={applyConfirmModalRef}
            />
        </>
    );
};
