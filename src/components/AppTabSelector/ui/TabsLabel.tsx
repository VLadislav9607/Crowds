import { AppText } from '@ui';
import { styles } from '../styles';

interface ITabsLabelProps {
  label?: string;
  badgeLabel?: string;
}

export const TabsLabel = ({ label, badgeLabel }: ITabsLabelProps) => {
  if (!label) return null;
  return (
    <AppText style={styles.label}>
      {label} {}
      {badgeLabel && <AppText style={styles.badgeLabel}>{badgeLabel}</AppText>}
    </AppText>
  );
};