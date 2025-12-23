import { COLORS } from "@styles";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

export const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.main} />
    </View>
  );
};