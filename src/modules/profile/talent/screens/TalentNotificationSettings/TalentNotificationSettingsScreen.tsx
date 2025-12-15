import { ScreenWithScrollWrapper } from "@components";
import { AppText } from "@ui";
import { COLORS } from "@styles";
import { View } from "react-native";
import { Switch } from "@components";
import { useState } from "react";
import { TalentNotificationSettings } from "./types";
import { styles } from "./styles";


export const TalentNotificationSettingsScreen = () => {

  const [notificationSettings, setNotificationSettings] = useState<TalentNotificationSettings>({
    oneToOneChats: true,
    notificationsOfEventBefore24Hours: true,
    groupMessages: false,
    applicationAcceptance: false,
    calendarItems: false,
    locationCheckInCheckOut: false,
    receivedFeedback: false,
    receivedPayment: false,
    reminderMessages24hrs6hrs1hrs: false,
    simpleMessages: false,
    locationChange: false,
  })

  const onChangeEmailSettings = (key: keyof TalentNotificationSettings) => (value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleAllNotifications = (value: boolean) => {
    const allKeys: Array<keyof TalentNotificationSettings> = [
      'oneToOneChats',
      'notificationsOfEventBefore24Hours',
      'groupMessages',
      'applicationAcceptance',
      'calendarItems',
      'locationCheckInCheckOut',
      'receivedFeedback',
      'receivedPayment',
      'reminderMessages24hrs6hrs1hrs',
      'simpleMessages',
      'locationChange',
    ]
    
    const updatedSettings = allKeys.reduce((acc, key) => {
      acc[key] = value
      return acc
    }, {} as TalentNotificationSettings)
    
    setNotificationSettings(updatedSettings)
  }

  const options = [
    { title: '1 on 1 chats', value: notificationSettings?.oneToOneChats, onPress: onChangeEmailSettings('oneToOneChats') },
    { title: 'Notifications of Event before 24 Hours', value: notificationSettings?.notificationsOfEventBefore24Hours, onPress: onChangeEmailSettings('notificationsOfEventBefore24Hours') },
    { title: 'Group messages', value: notificationSettings?.groupMessages, onPress: onChangeEmailSettings('groupMessages') },
    { title: 'Application acceptance', value: notificationSettings?.applicationAcceptance, onPress: onChangeEmailSettings('applicationAcceptance') },
    { title: 'Calendar items', value: notificationSettings?.calendarItems, onPress: onChangeEmailSettings('calendarItems') },
    { title: 'Location check in/check out', value: notificationSettings?.locationCheckInCheckOut, onPress: onChangeEmailSettings('locationCheckInCheckOut') },
    { title: 'Received feedback', value: notificationSettings?.receivedFeedback,  onPress: onChangeEmailSettings('receivedFeedback') },
    { title: 'Received payment', value: notificationSettings?.receivedPayment, onPress: onChangeEmailSettings('receivedPayment') },
    { title: 'Reminder messages 24hrs, 6 hrs, 1hrs', value: notificationSettings?.reminderMessages24hrs6hrs1hrs, onPress: onChangeEmailSettings('reminderMessages24hrs6hrs1hrs') },
    { title: 'Simple messages (hides all details)', value: notificationSettings?.simpleMessages, onPress: onChangeEmailSettings('simpleMessages') },
    { title: 'Location change', value: notificationSettings?.locationChange, onPress: onChangeEmailSettings('locationChange') },
  ]

  const allNotifications = options.every(option => option.value)


  return (
    <ScreenWithScrollWrapper headerVariant='withTitle' title="Notification Settings" headerStyles={{ backgroundColor: COLORS.black }}>

      <View style={styles.container}>
        <View style={styles.optionRow}>
          <AppText typography="regular_14">All notifications</AppText>
          <Switch active={allNotifications} onChange={toggleAllNotifications} trackColor={{ false: COLORS.white, true: COLORS.main }} />
        </View>
        {options.map((option) => (
          <View key={option.title} style={styles.optionRow}>
            <AppText key={option.title} typography="regular_14">{option.title}</AppText>
            <Switch active={!!option.value} onChange={option.onPress} trackColor={{ false: COLORS.white, true: COLORS.main }} />
          </View>
        ))}
      </View>

    </ScreenWithScrollWrapper>
  );
};