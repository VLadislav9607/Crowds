import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { RefObject, useCallback } from "react";

interface AppBottomSheetProps<T = unknown> extends BottomSheetModalProps<T> {
    bottomSheetRef?: RefObject<BottomSheetModal<T> | null>;
}


export const AppBottomSheet = <T = unknown>({ bottomSheetRef, ...bottomSheetProps }: AppBottomSheetProps<T>) => {

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                onPress={() => bottomSheetRef?.current?.dismiss()}
            />
        ),
        [bottomSheetRef],
    );

    const backgroundStyle: BottomSheetBackdropProps['style'] = {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    };

    return (
        <BottomSheetModal<T>
            ref={bottomSheetRef}
            backdropComponent={renderBackdrop}
            backgroundStyle={backgroundStyle}
            {...bottomSheetProps}
        />
    );
};
