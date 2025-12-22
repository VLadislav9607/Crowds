import { If, ScreenWithScrollWrapper } from "@components";
import { Image, TouchableOpacity, View } from "react-native";
import { COLORS, ColorsKeys } from "@styles";
import { AppButton, AppText } from "@ui";
import { styles } from "./styles";
import { ICONS } from "@assets";
import { SvgXml } from "react-native-svg";
import { LogoutModal, LogoutModalRef } from "../../../modals";
import { useRef } from "react";
import { goToScreen, Screens } from "@navigation";

interface TalentProfileTabOption {
  title: string;
  icon: string;
  textColor?: ColorsKeys;
  onPress: () => void;
}

export const TalentProfileTab = () => {
  const talentLogoutModalRef = useRef<LogoutModalRef>(null);

  const options: TalentProfileTabOption[] = [
    {
      title: 'My folders',
      icon: ICONS.notification('black'),
      onPress: () => { }
    },
    {
      title: 'Notification settings',
      icon: ICONS.notification('black'),
      onPress: () => goToScreen(Screens.TalentNotificationSettings)
    }, {
      title: 'Bank account details',
      icon: ICONS.user('black'),
      onPress: () => { }
    }, {
      title: 'Payment History',
      icon: ICONS.moneyBag('black'),
      onPress: () => { }
    }, {
      title: 'Change password',
      icon: ICONS.shieldCheck('black'),
      onPress: () => goToScreen(Screens.ChangePassword)
    }, {
      title: 'Update my availability',
      icon: ICONS.calendarIcon('black'),
      onPress: () => { }
    }, {
      title: 'Terms and conditions',
      icon: ICONS.bookMark('black'),
      onPress: () => { }
    }, {
      title: 'Delete account information',
      icon: ICONS.circleInfo('black'),
      onPress: () => { }
    }, {
      title: 'Privacy policy',
      icon: ICONS.userShield('black'),
      onPress: () => { }
    }, {
      title: 'Logout',
      icon: ICONS.logout('red'),
      textColor: 'red',
      onPress: () => talentLogoutModalRef.current?.open({})
    },
  ]
  return (
    <ScreenWithScrollWrapper
      headerVariant='empty'
      headerStyles={{ backgroundColor: COLORS.black }}
      customElement={<View style={styles.headerContainer}>
        <View style={styles.profileInfoContainer}>
          <Image style={styles.avatarImage} />

          <View>
            <View style={styles.nameBadgeContainer}>
              <AppText color="white" typography="semibold_16">Mia</AppText>

              <View style={[styles.cnBadge, styles.cnBadgeWithBorder]}>
                <AppText color='green' typography="semibold_8">
                  CN
                </AppText>
              </View>
            </View>

            <AppText color="gray" typography="regular_14" margin={{ top: 8 }}>Female 32, VIC</AppText>
          </View>

        </View>
        <AppButton onPress={() => goToScreen(Screens.TalentProfileSetup)} title="View Profile" iconPlace="right" icon={ICONS.chevronRight('white')} titleStyles={styles.viewProfileButtonTitle} iconSize={12} size='25' wrapperStyles={styles.viewProfileButtonWrapper} />
      </View>}
    >
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isLastItem = index === options.length - 1;
          return (
            <View key={option.title}>
              <TouchableOpacity activeOpacity={0.5} style={styles.optionItem} onPress={option.onPress}>
                <SvgXml xml={option.icon} width={20} height={20} />
                <AppText color={option.textColor || "black"} typography="bold_14">{option.title}</AppText>
              </TouchableOpacity>
              <If condition={!isLastItem}>
                <View style={styles.divider} />
              </If>
            </View>
          )
        })}
      </View>

      <LogoutModal ref={talentLogoutModalRef} />
    </ScreenWithScrollWrapper>
  );
};