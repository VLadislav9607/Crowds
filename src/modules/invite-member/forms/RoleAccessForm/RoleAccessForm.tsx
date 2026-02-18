import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, Control, FieldErrors, useWatch } from 'react-hook-form';

import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';

import { InviteMemberFormData } from '../../hooks';
import { CheckboxRowList } from '../../ui';
import { useGetMe, useGetBrandCapabilities } from '@actions';
import { If, AppTabSelector, ITabOption, Skeleton } from '@components';
import { countriesWithFlag } from '@constants';

interface RoleAccessFormProps {
  control: Control<InviteMemberFormData>;
  errors?: FieldErrors<InviteMemberFormData>;
  isLoading?: boolean;
}

export const RoleAccessForm = ({ control, isLoading }: RoleAccessFormProps) => {
  const { organizationMember } = useGetMe();
  const { data: brandCapabilities, isLoading: isCapabilitiesLoading } =
    useGetBrandCapabilities();
  const roleAccess = useWatch({ control, name: 'roleAccess' });

  const invitableOffices = useMemo(() => {
    const offices = organizationMember?.current_context?.offices ?? [];
    return offices.filter(
      office =>
        office.is_super_admin ||
        office.capabilities.includes('invite_team_members'),
    );
  }, [organizationMember?.current_context?.offices]);

  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(
    invitableOffices[0]?.office_id ?? '',
  );

  const talentCapabilities = brandCapabilities?.groupedCapabilities?.talent;
  const eventsCapabilities = brandCapabilities?.groupedCapabilities?.events;
  const checkinsCapabilities = brandCapabilities?.groupedCapabilities?.checkins;
  const settingsCapabilities = brandCapabilities?.groupedCapabilities?.settings;

  const tabOptions: ITabOption[] = useMemo(
    () =>
      invitableOffices.map(office => {
        const country = countriesWithFlag.find(
          c => c.code === office.country_code,
        );
        const badgeCount = roleAccess?.[office.office_id]?.length ?? 0;
        return {
          label: country?.name ?? office.country_code,
          value: office.office_id,
          badge: badgeCount > 0 ? badgeCount : undefined,
        };
      }),
    [invitableOffices, roleAccess],
  );

  const activeOfficeId = invitableOffices.find(
    o => o.office_id === selectedOfficeId,
  )
    ? selectedOfficeId
    : invitableOffices[0]?.office_id ?? '';

  const showLoader = isCapabilitiesLoading || isLoading;

  if (showLoader) {
    return (
      <>
        <AppText style={styles.title}>Role Access</AppText>

        <AppText style={styles.subtitle}>
          Please select which abilities this user should have
        </AppText>

        <View style={styles.container}>
          <Skeleton>
            <Skeleton.Item gap={20}>
              <Skeleton.Item width={'100%'} height={36} borderRadius={8} />
              <Skeleton.Item gap={10}>
                <Skeleton.Item width={80} height={16} borderRadius={4} />
                <Skeleton.Item flexDirection="row" gap={'5%'} flexWrap="wrap">
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                </Skeleton.Item>
              </Skeleton.Item>
              <Skeleton.Item gap={10}>
                <Skeleton.Item width={80} height={16} borderRadius={4} />
                <Skeleton.Item flexDirection="row" gap={'5%'} flexWrap="wrap">
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                  <Skeleton.Item
                    width={'21.25%'}
                    height={60}
                    borderRadius={8}
                  />
                </Skeleton.Item>
              </Skeleton.Item>
            </Skeleton.Item>
          </Skeleton>
        </View>
      </>
    );
  }

  return (
    <>
      <AppText style={styles.title}>Role Access</AppText>

      <AppText style={styles.subtitle}>
        Please select which abilities this user should have
      </AppText>

      <View style={styles.container}>
        <If condition={invitableOffices.length > 1}>
          <AppTabSelector
            options={tabOptions}
            selectedValue={activeOfficeId}
            onSelect={setSelectedOfficeId}
          />
        </If>

        <If condition={!!talentCapabilities}>
          <Controller
            control={control}
            name="roleAccess"
            render={({ field: { onChange, value } }) => (
              <CheckboxRowList
                label="Talent"
                items={
                  talentCapabilities?.map(capability => ({
                    label: capability.name,
                    value: capability.id,
                  })) || []
                }
                checkedValues={value?.[activeOfficeId] || []}
                onCheckedValuesChange={values =>
                  onChange({ ...value, [activeOfficeId]: values })
                }
              />
            )}
          />
        </If>

        <If condition={!!eventsCapabilities}>
          <Controller
            control={control}
            name="roleAccess"
            render={({ field: { onChange, value } }) => (
              <CheckboxRowList
                label="Events"
                items={
                  eventsCapabilities?.map(capability => ({
                    label: capability.name,
                    value: capability.id,
                  })) || []
                }
                checkedValues={value?.[activeOfficeId] || []}
                onCheckedValuesChange={values =>
                  onChange({ ...value, [activeOfficeId]: values })
                }
              />
            )}
          />
        </If>

        <If condition={!!checkinsCapabilities}>
          <Controller
            control={control}
            name="roleAccess"
            render={({ field: { onChange, value } }) => (
              <CheckboxRowList
                label="Check-ins"
                items={
                  checkinsCapabilities?.map(capability => ({
                    label: capability.name,
                    value: capability.id,
                  })) || []
                }
                checkedValues={value?.[activeOfficeId] || []}
                onCheckedValuesChange={values =>
                  onChange({ ...value, [activeOfficeId]: values })
                }
              />
            )}
          />
        </If>

        <If condition={!!settingsCapabilities}>
          <Controller
            control={control}
            name="roleAccess"
            render={({ field: { onChange, value } }) => (
              <CheckboxRowList
                label="Settings"
                items={
                  settingsCapabilities?.map(capability => ({
                    label: capability.name,
                    value: capability.id,
                  })) || []
                }
                checkedValues={value?.[activeOfficeId] || []}
                onCheckedValuesChange={values =>
                  onChange({ ...value, [activeOfficeId]: values })
                }
              />
            )}
          />
        </If>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 40,
  },
  title: {
    ...TYPOGRAPHY.h3_mob,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    ...TYPOGRAPHY.regular_12,
    marginBottom: 24,
    color: COLORS.dark_gray,
    textAlign: 'center',
  },
  masterAdminContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
});
