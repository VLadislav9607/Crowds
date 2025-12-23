import { ProfileSetupHeader } from "../ProfileSetupHeader"
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { styles } from "./styles"
import { forwardRef, useImperativeHandle } from "react";
import { AnimatedProfileSetupHeaderRef } from "./types";

export const AnimatedProfileSetupHeader = forwardRef<AnimatedProfileSetupHeaderRef>((_, ref) => {

    const headerOpacity = useSharedValue(1);
    const headerTranslateY = useSharedValue(0);
    const headerHeight = useSharedValue(120);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            const ANIMATION_START_LIMIT = 20;
            const ANIMATION_END_LIMIT = 40;
            const currentScrollY = event.contentOffset.y;

            if (currentScrollY <= ANIMATION_START_LIMIT) {
                headerTranslateY.value = 0;
                headerOpacity.value = 1;
                headerHeight.value = 120;
            } else if (currentScrollY <= ANIMATION_END_LIMIT) {
                headerHeight.value = 120;

                const scrollProgress = currentScrollY - ANIMATION_START_LIMIT;
                headerTranslateY.value = -scrollProgress;
                headerOpacity.value =
                    1 - scrollProgress / (ANIMATION_END_LIMIT - ANIMATION_START_LIMIT);
            } else {
                headerTranslateY.value = -(ANIMATION_END_LIMIT - ANIMATION_START_LIMIT);
                headerOpacity.value = 0;
                headerHeight.value = 0;
            }
        },
    });

    

    const animatedHeaderStyle = useAnimatedStyle(() => {
        return {
            opacity: headerOpacity.value,
            transform: [{ translateY: headerTranslateY.value }],
            height: headerHeight.value,
        };
    });

    useImperativeHandle(ref, () => ({
        scrollHandler,
    }));

    return (
        <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
            <ProfileSetupHeader />
        </Animated.View>
    )
});