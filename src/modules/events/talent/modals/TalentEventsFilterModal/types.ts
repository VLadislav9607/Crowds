import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { RefObject } from "react";

export interface TalentEventsFilterModalProps {
    bottomSheetRef?: RefObject<BottomSheetModal<null> | null>;
    bottomSheetProps?: Partial<BottomSheetModalProps>;
    onApply?: (data: TalentEventsFilterData) => void;
}

export interface TalentEventsFilterData {
    distance?: {
        min?: number;
        max?: number;
    };
    location?: {
        current?: boolean;
        another?: boolean;
        location?: string;
    };
    date?: {
        from?: Date;
        to?: Date;
    };
    jobType?: 'urgent_24_hours' | 'urgent_3_days' | 'hourly' | 'fixed';
}