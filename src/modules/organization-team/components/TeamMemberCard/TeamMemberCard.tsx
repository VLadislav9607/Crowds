import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@ui';
import { TeamMemberItem } from '@actions';
import { styles } from './styles';

interface TeamMemberCardProps {
  member: TeamMemberItem;
  onPress: (member: TeamMemberItem) => void;
}

export const TeamMemberCard: FC<TeamMemberCardProps> = ({
  member,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(member)}
      activeOpacity={0.7}
    >
      <View style={styles.info}>
        <AppText typography="bold_16" numberOfLines={1}>
          {member.firstName} {member.lastName}
        </AppText>
        <AppText
          typography="regular_12"
          style={styles.secondaryText}
          numberOfLines={1}
        >
          {member.email}
        </AppText>
        <View style={styles.positionContainer}>
          <AppText typography="medium_12" color="main" numberOfLines={1}>
            {member.position}
          </AppText>
        </View>
      </View>

      {member.status === 'pending' && (
        <View style={styles.pendingBadge}>
          <AppText typography="bold_12" style={styles.pendingText}>
            Pending
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};
