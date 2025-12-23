import { View } from "react-native";
import { AppText } from "@ui";
import { TalentStripeSetupProps, TalentStripeSetupRef } from "./types";
import { IMAGES } from "@assets";
import { Image } from "react-native";
import { DIMENSIONS } from "@constants";
import { forwardRef, useImperativeHandle } from "react";

export const TalentStripeSetup = forwardRef<TalentStripeSetupRef, TalentStripeSetupProps>(({ onSuccess }: TalentStripeSetupProps, ref) => {

    useImperativeHandle(ref, () => ({
        // to do: add setup logic
        onSetup: onSuccess || (() => {})
    }));
    return (
        <View>
            <AppText typography='regular_14' style={{ textAlign: 'center' }}>So we can pay you, we need to get your banking set up. The Banking Process has been integrated with <AppText typography="bold_14" color="main">Stripe Connect</AppText>; to ensure all your details stay safe on their platform.</AppText>
            <Image source={IMAGES.stripeConnect} style={{ width: 160, height: 145, marginTop: DIMENSIONS.height * 0.15, alignSelf: 'center' }} />
        </View>
    );
});

TalentStripeSetup.displayName = 'TalentStripeSetup';