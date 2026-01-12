import { ICONS } from '@assets';
import { ICountryWithFlag } from '@constants';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CountryPickerModal, CountryPickerModalData } from '@modules/common';
import { AppButton, AppInput, AppText } from '@ui';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { If } from '@components';
import { showErrorToast } from '@helpers';
import { BranchesSetupStepProps, BranchesSetupStepRef } from './types';

export const BranchesSetupStep = forwardRef<
  BranchesSetupStepRef,
  BranchesSetupStepProps
>(({ defaultValues }, ref) => {
  const countryPickerModalRef =
    useRef<BottomSheetModal<CountryPickerModalData>>(null);

  const [selectedHeadOfficeCountry, setSelectedHeadOfficeCountry] =
    useState<ICountryWithFlag | null>(
      defaultValues?.selectedHeadOfficeCountry ?? null,
    );
  const [selectedBrachesCountries, setSelectedBrachesCountries] = useState<
    ICountryWithFlag[]
  >(defaultValues?.selectedBrachesCountries ?? []);
  const [branchManagerEmails, setBranchManagerEmails] = useState<
    Record<string, string>
  >(defaultValues?.branchManagerEmails ?? {});

  useEffect(() => {
    if (defaultValues) {
      setSelectedHeadOfficeCountry(
        defaultValues.selectedHeadOfficeCountry ?? null,
      );
      setSelectedBrachesCountries(defaultValues.selectedBrachesCountries ?? []);
      setBranchManagerEmails(defaultValues.branchManagerEmails ?? {});
    }
  }, [defaultValues]);

  const onSelectHeadOfficeCountry = () => {
    countryPickerModalRef.current?.present({
      title: 'Select head office location',
      selectedCodesDefault: selectedHeadOfficeCountry?.code
        ? [selectedHeadOfficeCountry.code]
        : [],
      selectedMarkerElement: HQBadge,
      onCountryPicked: country => {
        setSelectedHeadOfficeCountry(country);
        onRemoveBranch(country);
      },
    });
  };

  const onSelectBrachesCountries = () => {
    if (!selectedHeadOfficeCountry) return;
    countryPickerModalRef.current?.present({
      title: 'Select branches countries',
      multiple: true,
      selectedCodesDefault: selectedBrachesCountries.map(c => c.code),
      selectedCodesForever: [selectedHeadOfficeCountry.code],
      disabledCodes: [selectedHeadOfficeCountry.code],
      selectedCountryMarkers: [
        {
          code: selectedHeadOfficeCountry.code,
          marker: (
            <View style={styles.hqBadge}>
              <AppText typography="bold_12" color="white">
                HQ
              </AppText>
            </View>
          ),
        },
      ],
      onCountriesPicked: countries => {
        setSelectedBrachesCountries(countries);
        onRemoveBranchManagerEmail(countries);
      },
    });
  };

  const onRemoveBranchManagerEmail = (countries: ICountryWithFlag[]) => {
    setBranchManagerEmails(prev => {
      const updated = { ...prev };
      const currentBranchCodes = countries.map(c => c.code);
      Object.keys(updated).forEach(code => {
        if (!currentBranchCodes.includes(code)) {
          delete updated[code];
        }
      });
      return updated;
    });
  };

  const HQBadge = (
    <View style={styles.hqBadge}>
      <AppText typography="bold_12" color="white">
        HQ
      </AppText>
    </View>
  );

  const onRemoveBranch = (country: ICountryWithFlag) => {
    setSelectedBrachesCountries(
      selectedBrachesCountries.filter(c => c.code !== country.code),
    );
    setBranchManagerEmails(prev => {
      const updated = { ...prev };
      delete updated[country.code];
      return updated;
    });
  };

  const onBranchManagerEmailChange = (countryCode: string, email: string) => {
    setBranchManagerEmails(prev => ({
      ...prev,
      [countryCode]: email,
    }));
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (
    onSubmit: (data: {
      selectedHeadOfficeCountry: ICountryWithFlag | null;
      selectedBrachesCountries: ICountryWithFlag[];
      branchManagerEmails: Record<string, string>;
    }) => void,
  ) => {
    return () => {
      if (!selectedHeadOfficeCountry) {
        showErrorToast('Please select head office location');
        return;
      }

      if (selectedBrachesCountries.length === 0) {
        onSubmit({
          selectedHeadOfficeCountry,
          selectedBrachesCountries,
          branchManagerEmails,
        });
        return;
      }

      for (const country of selectedBrachesCountries) {
        const email = branchManagerEmails[country.code];

        if (!email || email.trim() === '') {
          showErrorToast(
            `Please enter branch manager email for ${country.name}`,
          );
          return;
        }

        if (!isValidEmail(email.trim())) {
          showErrorToast(
            `Please enter a valid email address for ${country.name}`,
          );
          return;
        }
      }

      onSubmit({
        selectedHeadOfficeCountry,
        selectedBrachesCountries,
        branchManagerEmails,
      });
    };
  };

  useImperativeHandle(ref, () => ({ handleSubmit }));

  return (
    <View>
      <AppText typography="regular_14" margin={{ bottom: 16 }}>
        Select the country where your organization’s headquarters is located and
        all countries where you have branch offices.
      </AppText>

      <If condition={!selectedHeadOfficeCountry}>
        <TouchableOpacity
          onPress={onSelectHeadOfficeCountry}
          activeOpacity={0.5}
          style={styles.selectButton}
        >
          <View style={styles.buttonContent}>
            <SvgXml xml={ICONS.globe('gray_primary')} width={20} height={20} />
            <AppText typography="regular_14" color="black">
              Select head office location
            </AppText>
          </View>

          <SvgXml xml={ICONS.chevronRight('black')} width={20} height={20} />
        </TouchableOpacity>
      </If>

      <If condition={!!selectedHeadOfficeCountry}>
        <View style={styles.hqContainer}>
          <View style={styles.hqInfo}>
            <AppText style={styles.flag}>
              {selectedHeadOfficeCountry?.flag}
            </AppText>
            <AppText
              typography="semibold_16"
              style={styles.countryName}
              color="black"
            >
              {selectedHeadOfficeCountry?.name}
            </AppText>
            {HQBadge}
          </View>
          <AppButton
            onPress={onSelectHeadOfficeCountry}
            title="Change"
            variant="withBorder"
            size="36"
            wrapperStyles={styles.changeButton}
          />
        </View>

        <If condition={selectedBrachesCountries.length > 0}>
          <View style={styles.branchesList}>
            {selectedBrachesCountries.map((country, index) => (
              <View key={country.code} style={styles.branch}>
                <View style={styles.branchHeader}>
                  <View style={styles.branchInfo}>
                    <AppText style={styles.flag}>{country.flag}</AppText>
                    <View>
                      <AppText typography="semibold_16" color="black">
                        {country.name}
                      </AppText>
                      <AppText typography="regular_14" color="gray_primary">
                        Branch {index + 1}
                      </AppText>
                    </View>
                  </View>

                  <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={() => onRemoveBranch(country)}
                  >
                    <SvgXml xml={ICONS.trash('red')} width={20} height={20} />
                  </TouchableOpacity>
                </View>

                <AppInput
                  placeholder="Branch manager email"
                  value={branchManagerEmails[country.code] || ''}
                  onChangeText={email =>
                    onBranchManagerEmailChange(country.code, email)
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            ))}
          </View>
        </If>

        <TouchableOpacity
          onPress={onSelectBrachesCountries}
          activeOpacity={0.5}
          style={styles.addBranchButton}
        >
          <SvgXml xml={ICONS.plus('main')} width={24} height={24} />
          <AppText typography="semibold_16" color="main">
            Add Branch Office
          </AppText>
        </TouchableOpacity>
      </If>

      <CountryPickerModal bottomSheetRef={countryPickerModalRef} />
    </View>
  );
});
