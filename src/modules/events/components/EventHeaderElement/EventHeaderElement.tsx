import { Image, View } from "react-native";
import { AppText } from "@ui";
import { styles } from "./styles";
import { EventHeaderElementProps } from "./types";
import { If, Skeleton } from "@components";

export const EventHeaderElement = ({ showSkeleton = false }: EventHeaderElementProps) => {
    return (
        <View style={styles.container}>
            <If condition={!showSkeleton}>
                <>
                    <View style={styles.textContainer}>
                        <AppText typography='bold_20' color="white" margin={{ bottom: 12 }}>Fun Live Stage Segment, Single Guys</AppText>
                        <AppText typography='medium_12' color="white">The Atre Royal</AppText>
                    </View>

                    <Image style={styles.image} />
                </>
            </If>

            <If condition={showSkeleton}>
                <>
                    <Skeleton>
                        <Skeleton.Item width={180} height={21} borderRadius={4} marginBottom={4} />
                        <Skeleton.Item width={165} height={21} borderRadius={4} marginBottom={12} />

                        <Skeleton.Item width={100} height={18} borderRadius={4} />
                    </Skeleton>

                    <Skeleton>
                        <Skeleton.Item width={69} height={69} borderRadius={5} />
                    </Skeleton>
                </>
            </If>
        </View>
    );
};