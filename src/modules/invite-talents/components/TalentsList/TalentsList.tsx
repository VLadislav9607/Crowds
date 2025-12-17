import { StyleSheet, View } from 'react-native';

import { AppFlashList } from '@components';
import { AppText } from '@ui';

import { TalentCard } from '../TalentCard';
import { TalentsListProps } from './types';

export const TalentsList = ({ data, variant = 'invite' }: TalentsListProps) => {
  return (
    <View style={styles.container}>
      <AppText typography="bold_12" style={styles.sortBy}>
        Sort by: <AppText typography="regular_12">{'Gender'}</AppText>
      </AppText>

      <AppFlashList
        data={data}
        emptyText="No talents found"
        gap={0}
        floatingButtonProps={{
          title: variant === 'invite' ? 'Invite All' : 'Add All to List',
          onPress: () => {},
        }}
        renderItem={({ item }) => (
          <TalentCard
            talent={item}
            variant={variant}
            onMenuSelect={() => {}}
            onPressActionButton={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 14,
  },
  sortBy: {
    marginLeft: 'auto',
  },
});
