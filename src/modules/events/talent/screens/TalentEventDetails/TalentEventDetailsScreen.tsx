import { If, ScreenWithScrollWrapper } from "@components";
import { ICONS } from "@assets";
import { EventDetailsCardWithMap, EventDetailsTextBlock, EventDetailsRequirements, EventDetailsTags, EventHeaderElement } from "../../../components";
import { View } from "react-native";
import { ActionPurpleButton, AppButton, ChatButton } from "@ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@styles";
import { TalentEventCancelAttendanceModal, TalentEventCancelAttendanceModalRef } from "../../modals";
import { useRef } from "react";
import { styles } from "./styles";

export const TalentEventDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const cancelAttendanceModalRef = useRef<TalentEventCancelAttendanceModalRef>(null);
  const isLoading = false;

  return <ScreenWithScrollWrapper
    headerVariant='withTitleAndImageBg'
    headerStyles={styles.header}
    contentContainerStyle={{ paddingBottom: insets.bottom || 24 }}
    rightIcons={[{ icon: () => ICONS.bell('white'), onPress: () => { }, size: 20 }]}
    customElement={<EventHeaderElement />}
  >

    <View style={styles.container}>

      <EventDetailsTextBlock
        label="Description"
        text="This event is based on Australia for an live music concert. Please make sure that you arrive at or before the time specified below. Once you have arrived, please proceed to the check in area, click check in below and follow the prompts."
        showSkeleton={isLoading}
      />

      <EventDetailsCardWithMap
        showSkeleton={isLoading}
      />

      <EventDetailsRequirements requirements={[
        { title: 'Gender Required', options: ['Male'] },
        { title: 'People Required', options: ['30 Adults upto 29 years of age'] },
        { title: 'Industry', options: ['Reality Television'] }
      ]}
        showSkeleton={isLoading}
      />

      <EventDetailsTags
        tags={['Tag 1', 'Tag 2', 'Tag 3']}
        showSkeleton={isLoading}
      />

      <EventDetailsTextBlock
        label="Additional Details/Notes"
        text="Full details including times will be sent to your Crowds Now inbox no earlier than 24 hours prior to filming."
        showSkeleton={isLoading}
      />


      <If condition={!isLoading}>
        <>
          <ActionPurpleButton icon={ICONS.calendarEvent('main')} title="ADD EVENT TO MY CALENDER" />


          <View style={styles.chatButtonsContainer}>
            <ChatButton style={styles.chatButton} topText="CHAT WITH" bottomText="ORGANIZER" />
            <ChatButton style={styles.chatButton} topText="CHAT IN" bottomText="GROUP" />
          </View>

          <ActionPurpleButton
            icon={ICONS.upload('main')}
            titleIcon={ICONS.paperClip('main')}
            title="DOWNLOAD ATTACHED PDF"
          />
        </>

        <AppButton onPress={() => cancelAttendanceModalRef.current?.open({ eventId: '123', onConfirm: () => { } })} title="Cencel attendance" variant="withBorder" wrapperStyles={{ borderColor: COLORS.red }} titleStyles={{ color: COLORS.red }} />
      </If>
    </View>

    <TalentEventCancelAttendanceModal ref={cancelAttendanceModalRef} />

  </ScreenWithScrollWrapper>
};