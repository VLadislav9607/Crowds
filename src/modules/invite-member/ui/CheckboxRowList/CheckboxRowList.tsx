import { StyleSheet } from 'react-native';
import { CheckboxList, CheckboxListItem } from '@components';
import { COLORS, TYPOGRAPHY } from '@styles';

interface CheckboxRowListProps {
  label: string;
  items: CheckboxListItem[];
  hideBorderBottom?: boolean;
  checkedValues?: string[] | string;
  onCheckboxPress?: (item: CheckboxListItem) => void;
  onCheckedValuesChange?: (values: string[]) => void;
}

export const CheckboxRowList = ({
  label,
  items,
  hideBorderBottom = false,
  checkedValues,
  onCheckboxPress,
  onCheckedValuesChange,
}: CheckboxRowListProps) => {
  const isSingleItem = items.length === 1;
  const shouldUseGrid = items.length > 4;

  return (
    <CheckboxList
      label={label}
      labelStyle={styles.checkboxListLabel}
      containerStyle={[
        styles.checkboxListContainer,
        hideBorderBottom && styles.hideBorderBottom,
      ]}
      listContainerStyle={shouldUseGrid && styles.gridContainer}
      checkboxProps={{
        type: 'square',
        labelProps: { style: styles.checkboxLabel },
        containerStyle: [
          !shouldUseGrid && styles.checkboxItem,
          isSingleItem && { marginRight: 'auto' },
          shouldUseGrid && styles.gridItem,
        ],
      }}
      items={items}
      checkedValues={checkedValues}
      onCheckboxPress={onCheckboxPress}
      onCheckedValuesChange={onCheckedValuesChange}
    />
  );
};

const styles = StyleSheet.create({
  checkboxListContainer: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light_gray,
  },
  hideBorderBottom: {
    borderBottomWidth: 0,
  },
  checkboxListLabel: {
    ...TYPOGRAPHY.h5_mob,
    color: COLORS.black,
    marginBottom: 14,
  },
  gridContainer: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  checkboxItem: {
    flexDirection: 'column',
    maxWidth: 79,
    gap: 6,
  },
  gridItem: {
    maxWidth: '22%',
    flexDirection: 'column',
    gap: 6,
  },
  checkboxLabel: {
    ...TYPOGRAPHY.regular_12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
