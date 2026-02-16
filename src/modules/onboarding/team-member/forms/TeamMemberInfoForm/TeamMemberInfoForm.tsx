import { AppInput } from '@ui';
import { CheckboxList } from '@components';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Gender } from '@modules/profile';
import { styles } from './styles';
import {
  TeamMemberInfoFormData,
  TeamMemberInfoFormProps,
  TeamMemberInfoFormRef,
  teamMemberInfoFormSchema,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';

export const TeamMemberInfoForm = forwardRef<
  TeamMemberInfoFormRef,
  TeamMemberInfoFormProps
>(({ defaultValues }, ref) => {
  const { control, handleSubmit, getValues } = useForm<TeamMemberInfoFormData>({
    resolver: zodResolver(teamMemberInfoFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      position: '',
      ...defaultValues,
    } as Partial<TeamMemberInfoFormData>,
  });

  useImperativeHandle(ref, () => ({ handleSubmit, getValues }), [
    handleSubmit,
    getValues,
  ]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState }) => (
          <AppInput
            label="Username"
            placeholder="Enter your username"
            value={field.value}
            onChangeText={text => field.onChange(text.toLowerCase())}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <AppInput
            label="First Name"
            placeholder="Enter your first name"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <AppInput
            label="Last Name"
            placeholder="Enter your last name"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="gender"
        render={({ field, fieldState }) => (
          <CheckboxList
            label="Gender"
            items={[
              { label: 'Male', value: Gender.MALE },
              { label: 'Female', value: Gender.FEMALE },
              { label: 'Other', value: Gender.OTHER },
            ]}
            checkedValues={field.value}
            onCheckboxPress={item => field.onChange(item.value as Gender)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="position"
        render={({ field, fieldState }) => (
          <AppInput
            label="Position"
            placeholder="Enter your position"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    </View>
  );
});
