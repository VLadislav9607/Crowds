import { FlashListProps } from "@shopify/flash-list";
import { TalentEventStatus } from "../../../types";

export interface TalentEventsListProps extends Partial<Omit<FlashListProps<any>, 'data'>> {
    type: TalentEventStatus;
}