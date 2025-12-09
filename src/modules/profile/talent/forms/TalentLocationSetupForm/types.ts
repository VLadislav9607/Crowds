import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { z } from 'zod';

export const talentLocationSetupSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  stateProvince: z.string().min(1, 'State/Province is required'),
  suburb: z.string().min(1, 'Suburb is required'),
});

export interface TalentLocationSetupFormData
  extends z.infer<typeof talentLocationSetupSchema> {}

export interface TalentLocationSetupFormRef {
  handleSubmit: UseFormHandleSubmit<TalentLocationSetupFormData>;
  getValues: UseFormGetValues<TalentLocationSetupFormData>;
}
