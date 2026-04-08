import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AppModal } from '@components';
import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';
import { SettlementIssuesModalProps } from './types';
import { styles } from './styles';

const REASON_LABEL: Record<string, string> = {
  no_connect_account: 'No bank account connected',
  transfer_failed: 'Transfer failed',
};

export const SettlementIssuesModal = ({
  isVisible,
  onClose,
  failedPayouts,
  successCount,
}: SettlementIssuesModalProps) => {
  return (
    <AppModal
      isVisible={isVisible}
      onClose={onClose}
      title="Settlement completed"
    >
      <View style={styles.iconContainer}>
        <SvgXml xml={ICONS.dangerTriangle('orange')} width={26} height={26} />
      </View>

      <AppText typography="regular_14" color="gray_primary" style={styles.description}>
        Payment could not be sent to the following{' '}
        {failedPayouts.length === 1 ? 'talent' : 'talents'}:
      </AppText>

      <View style={styles.talentsList}>
        {failedPayouts.map((fp, index) => (
          <View
            key={fp.name + index}
            style={[styles.talentRow, index > 0 && styles.talentRowBorder]}
          >
            <View style={styles.iconWrapper}>
              <SvgXml xml={ICONS.closeIcon('red', 1)} width={10} height={10} />
            </View>
            <View style={styles.talentInfo}>
              <AppText typography="semibold_14" numberOfLines={1}>
                {fp.name}
              </AppText>
              <View style={styles.reasonPill}>
                <AppText typography="medium_9" style={{ color: '#D94040' }}>
                  {REASON_LABEL[fp.reason] ?? fp.reason}
                </AppText>
              </View>
            </View>
          </View>
        ))}
      </View>

      {successCount > 0 && (
        <View style={styles.successNote}>
          <SvgXml xml={ICONS.checkedCircle('light_green')} width={16} height={16} />
          <AppText typography="regular_12" color="gray_primary" style={{ flex: 1 }}>
            {successCount === 1
              ? '1 other payment was processed successfully.'
              : `${successCount} other payments were processed successfully.`}
          </AppText>
        </View>
      )}

      <AppButton
        title="OK"
        variant="primary"
        onPress={onClose}
        wrapperStyles={styles.btn}
      />
    </AppModal>
  );
};
