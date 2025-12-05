import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@ui';
import { BottomSheetFieldProps } from './types';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { useCallback, useRef, useState } from 'react';
import { styles } from './styles';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

export const BottomSheetField = ({
  value,
  label,
  errorMessage,
  labelProps,
  containerStyle,
  errorMessageProps,
  disabled,
  placeholderText = 'Select an option',
  placeholderTextProps,
  children,
  bottomSheetRef: externalBottomSheetRef,
  bottomSheetProps,
  disableRenderWhenClosed,
}: BottomSheetFieldProps) => {
  const internalBottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef = externalBottomSheetRef || internalBottomSheetRef;

  const [renderContent, setRenderContent] = useState(!disableRenderWhenClosed);

  const handleSheetChanges = useCallback(
    (index: number) => {
      disableRenderWhenClosed && index === -1 && setRenderContent(false);
    },
    [disableRenderWhenClosed],
  );

  const handleOpenSheet = useCallback(() => {
    disableRenderWhenClosed && setRenderContent(true);

    bottomSheetRef.current?.present();
  }, [bottomSheetRef, disableRenderWhenClosed]);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, [bottomSheetRef]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseSheet}
      />
    ),
    [handleCloseSheet],
  );

  const backgroundStyle: BottomSheetBackdropProps['style'] = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  };

  return (
    <>
      <View style={[styles.triggerContainer, containerStyle]}>
        {label && (
          <AppText
            color={disabled ? 'black_40' : 'black_50'}
            typography="medium_14"
            {...labelProps}
            style={[styles.label, styles.label]}
          >
            {label}
          </AppText>
        )}

        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.5}
          style={[styles.inputWrapper, disabled && styles.disabledInputWrapper]}
          onPress={handleOpenSheet}
        >
          {!!value && (
            <AppText typography="regular_14" color="black">
              {value}
            </AppText>
          )}

          {placeholderText && !value && (
            <AppText
              typography="regular_14"
              color={disabled ? 'black_20' : 'black_40'}
              {...placeholderTextProps}
            >
              {placeholderText}
            </AppText>
          )}

          <SvgXml xml={ICONS.chevronDown()} width={10} height={10} />
        </TouchableOpacity>

        {errorMessage && (
          <AppText
            typography="medium_10"
            color="red"
            {...errorMessageProps}
            style={[styles.errorMessage, styles.errorMessage]}
          >
            {errorMessage}
          </AppText>
        )}
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        onChange={handleSheetChanges}
        enablePanDownToClose
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={backgroundStyle}
        {...bottomSheetProps}
      >
        {renderContent && (
          <BottomSheetView style={styles.bottomSheetContent}>
            {typeof children === 'function'
              ? children({ onClose: handleCloseSheet })
              : children}
          </BottomSheetView>
        )}
      </BottomSheetModal>
    </>
  );
};
