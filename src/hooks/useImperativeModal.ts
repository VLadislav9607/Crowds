import { Ref, useCallback, useImperativeHandle, useState } from "react";

export interface ImperativeModalRef<T extends Record<string, any>> {
    open: (data: T) => void;
    close: () => void;
}

interface ImperativeModalProps<T extends Record<string, any>> {
    onRefOpen?: (data: T) => void;
    onRefClose?: () => void;
}

export const useImperativeModal = <T extends Record<string, any>>(
    ref: Ref<ImperativeModalRef<T>>,
    { onRefOpen, onRefClose }: ImperativeModalProps<T> = {},
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [refProps, setRefProps] = useState<T>({} as T);

    const open = useCallback((data: T) => {
        if (data) {
            setRefProps(data);
        }
        setIsVisible(true);
        onRefOpen?.(data);
    }, [onRefOpen]);

    const close = useCallback(() => {
        setIsVisible(false);
        setTimeout(()=>{
            onRefClose?.();
        }, 300)
    }, [onRefClose]);

    useImperativeHandle(ref, () => ({
        open: open as (data?: T) => void,
        close,
    }), [open, close]);

    return {
        isVisible,
        refProps,
        close,
    };
};
