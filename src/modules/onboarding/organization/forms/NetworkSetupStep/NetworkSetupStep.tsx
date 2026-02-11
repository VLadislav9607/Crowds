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
import { If, SelectButton } from '@components';
import {
  NetworkSetupStepData,
  NetworkSetupStepRef,
  NetworkSetupStepProps,
} from './types';
import { HQBadge, OPSBadge } from '../../components';
import { ICountryWithFlag } from '@constants';
import { showErrorToast } from '@helpers';

export const NetworkSetupStep = forwardRef<
  NetworkSetupStepRef,
  NetworkSetupStepProps
>((props, ref) => {
  const { defaultNetwork, headquartersData } = props;

  const [data, setData] = useState<NetworkSetupStepData>(
    defaultNetwork ?? {
      branches: [],
      isLocalDecisionMaker: null,
    },
  );

  const onSelectIsLocalDecisionMaker = (isLocalDecisionMaker: boolean) => {
    setData({ ...data, isLocalDecisionMaker });
  };

  const isPresentOPS = !!headquartersData?.opsCountry;

  const countryPickerModalRef =
    useRef<BottomSheetModal<CountryPickerModalData>>(null);

  const onAddBranch = () =>
    countryPickerModalRef.current?.present({
      title: 'Select branch office location',
      selectedCodesDefault: [...data.branches.map(branch => branch.code)],
      selectedCountryMarkers: [
        { code: headquartersData?.hqCountry?.code!, marker: <HQBadge /> },
        { code: headquartersData?.opsCountry?.code!, marker: <OPSBadge /> },
      ],
      selectedCodesForever: [
        headquartersData?.hqCountry?.code!,
        headquartersData?.opsCountry?.code!,
      ],
      disabledCodes: [
        headquartersData?.hqCountry?.code!,
        headquartersData?.opsCountry?.code!,
      ],
      multiple: true,
      onCountriesPicked: countries => {
        setData({ ...data, branches: countries });
      },
    });

  const handleSubmit = useCallback(() => {
    if (typeof data.isLocalDecisionMaker !== 'boolean') {
      showErrorToast(
        'Please select how decisions are made across your organization',
      );
      return;
    }
    return data;
  }, [data]);

  const onRemoveBranch = (branch: ICountryWithFlag) => {
    setData({
      ...data,
      branches: data.branches.filter(b => b.code !== branch.code),
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: cb => {
        const submitData = handleSubmit();
        submitData && cb(submitData);
      },
      getValues: cb => cb(data),
    }),
    [data, handleSubmit],
  );

  return (
    <View>
      <AppText typography="bold_20" margin={{ bottom: 10 }}>
        Build your network
      </AppText>

      <AppText typography="regular_14" margin={{ bottom: 24 }}>
        Are there any other branches or offices you want to add as part of your
        organization's network?
      </AppText>

      <View style={styles.networkSetupContainer}>
        <View style={styles.networkItem}>
          <View style={styles.flagContainer}>
            <AppText style={styles.flag}>
              {headquartersData?.hqCountry?.flag}
            </AppText>
            <AppText typography="regular_14">
              {headquartersData?.hqCountry?.name}
            </AppText>
          </View>
          <HQBadge />
        </View>

        <If condition={!!headquartersData?.opsCountry}>
          <View style={styles.networkItemSeparator} />
          <View style={styles.networkItem}>
            <View style={styles.flagContainer}>
              <AppText style={styles.flag}>
                {headquartersData?.opsCountry?.flag}
              </AppText>
              <AppText typography="regular_14">
                {headquartersData?.opsCountry?.name}
              </AppText>
            </View>
            <OPSBadge />
          </View>
        </If>
      </View>

      <AppText typography="semibold_16" margin={{ top: 16 }}>
        Branches
      </AppText>

      {!!data.branches.length && (
        <View style={styles.branchesList}>
          {data.branches.map((branch, index) => (
            <View style={styles.branchItem}>
              <AppText style={styles.flag}>{branch.flag}</AppText>
              <View style={styles.branchInfo}>
                <AppText typography="semibold_16" margin={{ bottom: 2 }}>
                  {branch.name}
                </AppText>
                <AppText typography="regular_14" color="gray_primary">
                  Branch {index + 1}
                </AppText>
              </View>
              <TouchableOpacity
                hitSlop={20}
                onPress={() => onRemoveBranch(branch)}
              >
                <SvgXml xml={ICONS.trash('red')} width={20} height={20} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <AppButton
        title="Add Branch Office"
        variant="withBorder"
        size="56"
        wrapperStyles={styles.addBranchButton}
        icon={ICONS.plus('main')}
        titleStyles={styles.addBranchButtonText}
        onPress={onAddBranch}
      />

      <View style={styles.separator} />

      <AppText typography="semibold_16" margin={{ bottom: 10 }}>
        How are decisions made across your organization?
      </AppText>
      <AppText typography="regular_14" margin={{ bottom: 16 }}>
        Do your branches have their own managing directors or decision makers,
        or do these decisions come from {isPresentOPS ? 'OPS' : 'HQ'}?
      </AppText>

      <View style={styles.decisionMakerContainer}>
        <SelectButton
          isSelected={data.isLocalDecisionMaker === true}
          title="Local Decision Makers"
          description="Each branch has its own directors or managers who make independent decisions"
          onPress={() => onSelectIsLocalDecisionMaker(true)}
        />
        <SelectButton
          isSelected={data.isLocalDecisionMaker === false}
          title={`Centralized at ${isPresentOPS ? 'OPS' : 'HQ'}`}
          description="Key decisions are made centrally at headquarters for allocations"
          onPress={() => onSelectIsLocalDecisionMaker(false)}
        />
      </View>

      <CountryPickerModal bottomSheetRef={countryPickerModalRef} />
    </View>
  );
});
