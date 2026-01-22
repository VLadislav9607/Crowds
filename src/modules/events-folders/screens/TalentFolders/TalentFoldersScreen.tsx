import { ICONS } from '@assets';
import { If, ScreenWrapper, Skeleton } from '@components';
import { goToScreen, Screens } from '@navigation';
import { AppButton, AppText } from '@ui';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { useGetEventsFolders } from '@actions';
import { EventFolder } from '@actions';
import { useRefetchQuery } from '@hooks';

export const TalentFoldersScreen = () => {
  const { data: folders, isLoading, refetch } = useGetEventsFolders({});

  const isEmpty = folders?.length === 0 && !isLoading;

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const renderFolder = (folder: EventFolder) => {
    return (
      <TouchableOpacity
        key={folder.id}
        onPress={() =>
          goToScreen(Screens.TalentEventsFolder, {
            folderId: folder.id,
            folderName: folder.name,
          })
        }
        activeOpacity={0.8}
        style={styles.folderContainer}
      >
        <View>
          <AppText typography="h6" margin={{ bottom: 4 }}>
            {folder.name}
          </AppText>
          <AppText typography="regular_14" color="gray_primary">
            {folder.events_count} event{folder.events_count === 1 ? '' : 's'}
          </AppText>
        </View>

        <SvgXml xml={ICONS.chevronRight('black_80')} width={24} height={24} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      title="My Folders"
      headerStyles={styles.headerStyles}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingQuery}
            onRefresh={refetchQuery}
          />
        }
      >
        <If condition={isEmpty}>
          <AppText
            style={styles.emptyText}
            typography="medium_14"
            color="gray_primary"
          >
            No folders added yet
          </AppText>
        </If>

        <If condition={isLoading}>
          <Skeleton>
            <Skeleton.Item style={{ gap: 8 }}>
              <Skeleton.Item width={'100%'} height={74} borderRadius={20} />
              <Skeleton.Item width={'100%'} height={74} borderRadius={20} />
              <Skeleton.Item width={'100%'} height={74} borderRadius={20} />
            </Skeleton.Item>
          </Skeleton>
        </If>

        <If condition={!isLoading && !isEmpty}>
          {folders?.map(folder => renderFolder(folder))}
        </If>
      </ScrollView>

      <AppButton
        onPress={() => goToScreen(Screens.CreateEventsFolder)}
        title="Create a new Folder"
        wrapperStyles={styles.button}
      />
    </ScreenWrapper>
  );
};
