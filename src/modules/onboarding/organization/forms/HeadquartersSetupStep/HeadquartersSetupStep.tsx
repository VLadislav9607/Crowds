import { ICONS } from '@assets';
import { AppButton, AppText } from '@ui';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CountryPickerModal, CountryPickerModalData } from '@modules/common';
import { ICountryWithFlag } from '@constants';
import { If, SelectButton } from '@components';
import { HQBadge, OPSBadge } from '../../components';
import {
  HeadquartersSetupStepData,
  HeadquartersSetupStepRef,
  HeadquartersSetupStepProps,
} from './types';
import { showErrorToast } from '@helpers';

export const HeadquartersSetupStep = forwardRef<
  HeadquartersSetupStepRef,
  HeadquartersSetupStepProps
>((props, ref) => {
  const { defaultValues } = props;

  const [data, setData] = useState<HeadquartersSetupStepData>(
    defaultValues ?? {
      hqCountry: null,
      opsCountry: null,
    },
  );

  const [isActiveHQ, setIsActiveHQ] = useState<boolean | undefined>(
    defaultValues ? !defaultValues.opsCountry : undefined,
  );

  const { hqCountry, opsCountry } = data;

  const countryPickerModalRef =
    useRef<BottomSheetModal<CountryPickerModalData>>(null);

  const setOPSCountry = (country: ICountryWithFlag | null) => {
    setData({ ...data, opsCountry: country });
  };

  const onSelectHQCountry = () => {
    countryPickerModalRef.current?.present({
      title: 'Select head office location',
      selectedCodesDefault: hqCountry?.code
        ? [hqCountry.code, opsCountry?.code!]
        : [],
      selectedCountryMarkers: [
        { code: hqCountry?.code!, marker: <HQBadge /> },
        { code: opsCountry?.code!, marker: <OPSBadge /> },
      ],
      onCountryPicked: country => {
        setData({
          ...data,
          hqCountry: country,
          opsCountry: country.code === opsCountry?.code ? null : opsCountry,
        });
      },
    });
  };

  const onSelectOPSCountry = () =>
    countryPickerModalRef.current?.present({
      title: 'Select operational office location',
      selectedCodesDefault: [hqCountry?.code!, opsCountry?.code!],
      selectedCountryMarkers: [
        { code: hqCountry?.code!, marker: <HQBadge /> },
        { code: opsCountry?.code!, marker: <OPSBadge /> },
      ],
      disabledCodes: [hqCountry?.code!],
      onCountryPicked: setOPSCountry,
    });

  const renderSelectLocationButton = (title: string, onPress: () => void) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={styles.selectButton}
      >
        <View style={styles.buttonContent}>
          <SvgXml xml={ICONS.globe('gray_primary')} width={20} height={20} />
          <AppText typography="regular_14" color="black">
            {title}
          </AppText>
        </View>

        <SvgXml xml={ICONS.chevronRight('black')} width={20} height={20} />
      </TouchableOpacity>
    );
  };

  const renderSelectedLocation = (
    country: ICountryWithFlag,
    onChangePress: () => void,
    badge: React.ReactNode,
  ) => {
    return (
      <View style={styles.hqContainer}>
        <View style={styles.hqInfoContainer}>
          <View style={styles.hqInfo}>
            <AppText style={styles.flag}>{country?.flag}</AppText>
            <AppText
              typography="semibold_16"
              style={styles.countryName}
              color="black"
            >
              {country?.name}
            </AppText>
            {badge}
          </View>
          <AppButton
            onPress={onChangePress}
            title="Change"
            variant="withBorder"
            size="36"
            wrapperStyles={styles.changeButton}
          />
        </View>
      </View>
    );
  };

  const handleSubmit = useCallback(() => {
    if (!hqCountry) {
      showErrorToast('Please select head office location');
      return;
    }

    if (typeof isActiveHQ !== 'boolean') {
      showErrorToast('Please select if the HQ is operationally active');
      return;
    }

    if (isActiveHQ === false && !opsCountry) {
      showErrorToast('Please select operational office location');
      return;
    }

    return data;
  }, [data, isActiveHQ, hqCountry, opsCountry]);

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: cb => {
        const submitData = handleSubmit();
        submitData && cb(submitData);
      },
    }),
    [handleSubmit],
  );

  return (
    <View>
      <AppText typography="bold_20" margin={{ bottom: 10 }}>
        Where is the organization headquartered?
      </AppText>

      <AppText typography="regular_14" margin={{ bottom: 24 }}>
        This is the registered headquarters of your organization. It may be
        different from where your team is primarily based or operates from.
      </AppText>

      <If condition={!hqCountry}>
        {renderSelectLocationButton(
          'Select head office location',
          onSelectHQCountry,
        )}
      </If>

      <If condition={!!hqCountry}>
        {renderSelectedLocation(hqCountry!, onSelectHQCountry, <HQBadge />)}

        <AppText typography="semibold_16" margin={{ top: 24, bottom: 10 }}>
          Is this HQ operationally active?
        </AppText>
        <AppText typography="regular_14" margin={{ bottom: 16 }}>
          Some organizations have a registered HQ for legal/tax purposes but
          operate primarily from another location.
        </AppText>

        <View style={styles.selectButtonsContainer}>
          <SelectButton
            title="Active HQ"
            isSelected={isActiveHQ === true}
            description="Day-to-day operations and key decisions are made from this location"
            onPress={() => {
              setIsActiveHQ(true);
              setOPSCountry(null);
            }}
          />
          <SelectButton
            title="Silent HQ"
            isSelected={isActiveHQ === false}
            description="Registered address only — operations run from a different location"
            onPress={() => {
              setIsActiveHQ(false);
            }}
          />
        </View>
      </If>

      <If condition={isActiveHQ === false}>
        <View style={styles.separator} />
        <AppText typography="semibold_16">
          Select your main operational office
        </AppText>
        <AppText typography="regular_14" margin={{ top: 10, bottom: 16 }}>
          Where does your team primarily work from and make day-to-day
          decisions?
        </AppText>

        <If condition={!opsCountry}>
          {renderSelectLocationButton(
            'Select operational office location',
            onSelectOPSCountry,
          )}
        </If>

        <If condition={!!opsCountry}>
          {renderSelectedLocation(
            opsCountry!,
            onSelectOPSCountry,
            <OPSBadge />,
          )}
        </If>
      </If>

      <CountryPickerModal bottomSheetRef={countryPickerModalRef} />
    </View>
  );
});
