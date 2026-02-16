import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, Control, FieldErrors, useWatch } from 'react-hook-form';

import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';

import { InviteMemberFormData } from '../../hooks';
import { CheckboxRowList } from '../../ui';
import { useGetMe, useGetBrandCapabilities } from '@actions';
import { If, AppTabSelector, ITabOption } from '@components';
import { countriesWithFlag } from '@constants';

interface RoleAccessFormProps {
  control: Control<InviteMemberFormData>;
  errors?: FieldErrors<InviteMemberFormData>;
}

export const RoleAccessForm = ({ control }: RoleAccessFormProps) => {
  const { organizationMember } = useGetMe();
  const { data: brandCapabilities } = useGetBrandCapabilities();
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

        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', alignSelf: 'center', flexGrow: 1 }}
        >
          <AppTabSelector
          
            onSelect={value => setActiveBranch(value)}
            options={branchItems || []}
            selectedValue={activeBranch}
            
          />
        </ScrollView> */}

        {/* <View style={styles.masterAdminContainer}>
          <Controller
            control={control}
            name="roleAccess"
            render={({ field: { onChange, value } }) => (
              <CheckboxRowList
                label="Master Admin"
                hideBorderBottom
                items={[
                  {
                    label: 'Assign as Master Admin',
                    value: RoleAccess.ASSIGN_AS_MASTER_ADMIN,
                  },
                ]}
                checkedValues={value?.map(v => v) || []}
                onCheckedValuesChange={values =>
                  onChange(values as RoleAccess[])
                }
              />
            )}
          />

          <MasterAccessNote />
        </View> */}

        {/* <Controller
          control={control}
          name="roleAccess"
          render={({ field: { onChange, value } }) => (
            <CheckboxRowList
              label="Talent"
              items={[
                {
                  label: 'Recruit Applicants',
                  value: RoleAccess.RECRUIT_APPLICANTS,
                },
                {
                  label: 'Approve Applicants',
                  value: RoleAccess.APPROVE_APPLICANTS,
                },
                { label: 'Give Feedback', value: RoleAccess.GIVE_FEEDBACK },
                { label: 'Rate Applicants', value: RoleAccess.RATE_APPLICANTS },
              ]}
              checkedValues={value?.map(v => v) || []}
              onCheckedValuesChange={values => onChange(values as RoleAccess[])}
            />
          )}
        /> */}

        {/* <Controller
          control={control}
          name="roleAccess"
          render={({ field: { onChange, value } }) => (
            <CheckboxRowList
              label="Events"
              items={[
                {
                  label: 'Create/Edit Events',
                  value: RoleAccess.CREATE_EDIT_EVENTS,
                },
                { label: 'View Events', value: RoleAccess.VIEW_EVENTS },
                {
                  label: 'Message Applicants',
                  value: RoleAccess.MESSAGE_APPLICANTS,
                },
                { label: 'Group Message', value: RoleAccess.GROUP_MESSAGE },
                {
                  label: 'One on One Message',
                  value: RoleAccess.ONE_ON_ONE_MESSAGE,
                },
              ]}
              checkedValues={value?.map(v => v) || []}
              onCheckedValuesChange={values => onChange(values as RoleAccess[])}
            />
          )}
        /> */}

        {/* <Controller
          control={control}
          name="roleAccess"
          render={({ field: { onChange, value } }) => (
            <CheckboxRowList
              label="Check-ins"
              items={[
                {
                  label: 'Manage Check-Ins',
                  value: RoleAccess.MANAGE_CHECK_INS,
                },
              ]}
              checkedValues={value?.map(v => v) || []}
              onCheckedValuesChange={values => onChange(values as RoleAccess[])}
            />
          )}
        /> */}

        {/* <Controller
          control={control}
          name="roleAccess"
          render={({ field: { onChange, value } }) => (
            <CheckboxRowList
              label="Settings"
              items={[
                {
                  label: 'Invite Team Members',
                  value: RoleAccess.INVITE_TEAM_MEMBERS,
                },
                {
                  label: 'Edit Team Members',
                  value: RoleAccess.EDIT_TEAM_MEMBERS,
                },
                {
                  label: 'Edit Business Info',
                  value: RoleAccess.EDIT_BUSINESS_INFO,
                },
              ]}
              checkedValues={value?.map(v => v) || []}
              onCheckedValuesChange={values => onChange(values as RoleAccess[])}
            />
          )}
        /> */}

        {/* <Controller
          control={control}
          name="roleAccess"
          render={({ field: { onChange, value } }) => (
            <CheckboxRowList
              label="Financial"
              items={[
                { label: 'View Earnings', value: RoleAccess.VIEW_EARNINGS },
                {
                  label: 'Authorize Talent Payments',
                  value: RoleAccess.AUTHORIZE_TALENT_PAYMENTS,
                },
                { label: 'Edit Bank Info', value: RoleAccess.EDIT_BANK_INFO },
              ]}
              checkedValues={value?.map(v => v) || []}
              onCheckedValuesChange={values => onChange(values as RoleAccess[])}
            />
          )}
        /> */}
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
