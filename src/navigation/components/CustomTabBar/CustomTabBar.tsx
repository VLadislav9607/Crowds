import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { TAB_BAR_MARGIN_BOTTOM } from '../../constants/tabBar';
import { Screens } from '@navigation';
import { If } from '@components';

const GRADIENT_HEIGHT = 120;

export const CustomTabBar = (props: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const currentRoute = props.state.routes[props.state.index].name;
  const isQRCodeScanTab = currentRoute === Screens.TalerQRCode;

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <If condition={!isQRCodeScanTab}>
        <LinearGradient
          colors={['rgba(251, 251, 251, 0)', '#FBFBFB']}
          locations={[0.2849, 1]}
          style={styles.gradient}
        />
      </If>
      <View style={styles.tabBarWrapper}>
        <BottomTabBar {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
  },
  tabBarWrapper: {
    marginHorizontal: 20,
    marginBottom: TAB_BAR_MARGIN_BOTTOM,
  },
});
