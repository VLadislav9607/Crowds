import { View, ImageBackground, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppText, Avatar } from '@ui';
import { goBack } from '@navigation';
import { If } from '@components';

import { headerImageBgMap, HeaderContentProps, IAppHeaderProps } from './types';
import { styles } from './styles';

export const AppHeader = ({
  title,
  customElement,
  headerImageBg,
  headerStyles,
  colorHeader,
  headerVariant,
  showBackButton = true,
  logoProps,
  avatarUrl,
  rightIcons,
  titleProps,
  goBackCallback,
}: IAppHeaderProps) => {
  const insets = useSafeAreaInsets();
  const handleBackPress = () => {
    goBackCallback ? goBackCallback() : goBack();
  };

  const headerStyle = {
    ...styles.header,
    paddingTop: insets.top || 24,
    backgroundColor: COLORS[colorHeader || 'main'],
  };

  return (
    <>
      <If condition={headerVariant === 'empty'}>
        <View style={[headerStyle]}>{customElement}</View>
      </If>

      <If condition={headerVariant === 'withLogo'}>
        <View style={[headerStyle, styles.headerWithLogo, headerStyles]}>
          <View style={styles.logoHeaderInner}>
            <SvgXml xml={ICONS.fullLogo()} {...logoProps} />
            {rightIcons && <RightIcons rightIcons={rightIcons} />}
          </View>
          {customElement}
        </View>
      </If>

      <If condition={headerVariant === 'withTitle'}>
        <View style={[headerStyle, styles.headerWithTitle, headerStyles]}>
          <View style={styles.titleHeaderInner}>
            <HeaderContent
              title={title}
              showBackButton={showBackButton}
              onBackPress={handleBackPress}
              titleProps={titleProps}
            />
            {rightIcons && <RightIcons rightIcons={rightIcons} />}
          </View>
          {customElement}
        </View>
      </If>

      <If condition={headerVariant === 'withTitleAndImageBg'}>
        <ImageBackground
          resizeMode="stretch"
          source={headerImageBgMap[headerImageBg || 'purple']}
          style={[headerStyle, styles.withTitleAndImageBg, headerStyles]}
        >
          <View style={styles.overlay} />
          <View style={[styles.contentWrapperColumn, styles.headerContainer]}>
            <View style={styles.titleHeaderInner}>
              <HeaderContent
                title={title}
                showBackButton={showBackButton}
                onBackPress={handleBackPress}
                titleProps={titleProps}
                avatarUrl={avatarUrl}
              />
              {rightIcons && <RightIcons rightIcons={rightIcons} />}
            </View>
          </View>
          {customElement}
        </ImageBackground>
      </If>

      <If condition={headerVariant === 'withLogoAndImageBg'}>
        <ImageBackground
          resizeMode="stretch"
          source={headerImageBgMap[headerImageBg || 'purple']}
          style={[headerStyle, styles.withTitleAndImageBg, headerStyles]}
        >
          <View style={styles.overlay} />
          <View style={[styles.contentWrapperLogo, styles.headerContainer]}>
            <View style={styles.logoHeaderInner}>
              <SvgXml xml={ICONS.fullLogo()} width={182} height={42} />
              {rightIcons && <RightIcons rightIcons={rightIcons} />}
            </View>
            {customElement}
          </View>
        </ImageBackground>
      </If>
    </>
  );
};

const HeaderContent = ({
  title,
  showBackButton,
  titleProps,
  avatarUrl,
  onBackPress,
}: HeaderContentProps) => (
  <View style={styles.headerContentRow}>
    {showBackButton && onBackPress && (
      <Pressable onPress={onBackPress}>
        <SvgXml xml={ICONS.goBackArrow()} style={styles.backButton} />
      </Pressable>
    )}
    {avatarUrl && (
      <Avatar
        size={48}
        bucket="talents_avatars"
        imgPath={avatarUrl}
        style={styles.avatar}
      />
    )}
    {title && (
      <AppText
        numberOfLines={1}
        {...titleProps}
        style={[styles.title, titleProps?.style]}
      >
        {title}
      </AppText>
    )}
  </View>
);

const RightIcons = ({
  rightIcons,
}: {
  rightIcons?: IAppHeaderProps['rightIcons'];
}) => {
  if (!rightIcons) return null;
  return (
    <View style={styles.rightIconsWrapper}>
      {rightIcons.map(({ icon, onPress, size }) => (
        <Pressable key={icon()} hitSlop={10} onPress={onPress}>
          <SvgXml xml={icon()} width={size || 24} height={size || 24} />
        </Pressable>
      ))}
    </View>
  );
};
