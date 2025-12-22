import { AppTextProps } from "@ui";

export interface AppToastProps {
    textProps?: Partial<AppTextProps>;
    removeTopOffset?: boolean;
}

export interface ToastCustomProps {
    textProps?: Partial<AppTextProps>;
}

