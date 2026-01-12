import { AppImageProps } from './types';
import { useGetFileUrl } from '@actions';
import { Skeleton } from '../Skeleton';
import { If } from '../If';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import FastImage from '@d11/react-native-fast-image';

export const AppImage = ({
  imgUri,
  imgPath,
  bucket,
  placeholderImage,
  containerStyle,
  CustomElements,
  placeholderIcon,
  placeholderIconSize = 112,
  showSkeleton: showSkeletonProp = false,
  onPress,
}: AppImageProps) => {
  const { data: response, isLoading: isUrlLoading } = useGetFileUrl({
    bucket,
    path: imgPath || undefined,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const url = response?.url || imgUri;

  const Container = onPress ? TouchableOpacity : View;

  const isPresentUriOrPlaceholderImage = !!url || !!placeholderImage;

  const isPhotoLoading = isUrlLoading || (!!imgPath && !isLoaded);

  const showSkeleton = showSkeletonProp || isPhotoLoading;

  return (
    <Container
      activeOpacity={0.8}
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <If condition={!!url && !showSkeletonProp}>
        <FastImage
          onLoadEnd={() => setIsLoaded(true)}
          onError={e => console.log('error', e)}
          style={styles.image}
          source={{ uri: url }}
        />
      </If>

      <If condition={!!placeholderImage && !showSkeleton}>
        <Image source={placeholderImage} style={styles.image} />
      </If>

      <If condition={showSkeleton}>
        <View style={[StyleSheet.absoluteFill]}>
          <Skeleton>
            <Skeleton.Item width={'100%'} height={'100%'} />
          </Skeleton>
        </View>
      </If>

      <If
        condition={
          !!placeholderIcon && !isPresentUriOrPlaceholderImage && !showSkeleton
        }
      >
        <SvgXml
          xml={placeholderIcon!}
          width={placeholderIconSize}
          height={placeholderIconSize}
        />
      </If>

      <If condition={!!CustomElements}>{CustomElements}</If>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
