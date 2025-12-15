import { useRef } from "react";
import { TalentEventUnavailableTimeModalRef } from "../../modals";
import { TalentEventAlreadyBookedModalRef } from "../../modals";
import { TalentEventApplyConfirmModalRef } from "../../modals";

export const useTalentEventsList = () => {

    const unavailableTimeModalRef = useRef<TalentEventUnavailableTimeModalRef>(null);
    const alreadyBookedModalRef = useRef<TalentEventAlreadyBookedModalRef>(null);
    const applyConfirmModalRef = useRef<TalentEventApplyConfirmModalRef>(null);

    const hasMoreItems = false;
    const isLoading = false;


    return {
        unavailableTimeModalRef,
        alreadyBookedModalRef,
        applyConfirmModalRef,
        hasMoreItems,
        isLoading,
    }
}