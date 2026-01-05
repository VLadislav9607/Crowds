import {
  Ethnicity,
  EyeColour,
  FacialAttributes,
  HairColour,
  SkinTone,
  TattooSpot,
} from '@modules/profile';
import { z } from 'zod';

export const talentProfileSetupSchema = z
  .object({
    hairColour: z.enum(HairColour).optional(),
    eyeColour: z.enum(EyeColour).optional(),
    facialAttributes: z.array(z.enum(FacialAttributes)).optional().nullable(),
    tattooSpot: z.array(z.enum(TattooSpot)).optional().nullable(),
    ethnicity: z.enum(Ethnicity).optional(),
    build: z.number().optional(),
    height: z.number().optional(),
    skinTone: z.enum(SkinTone).optional(),
    isPregnant: z.boolean().optional(),
    months: z.string().optional(),
    categories: z.array(z.string()).optional(),
    subcategories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    additionalSkills: z.string().optional(),
    photo: z
      .object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
      .optional(),
  })
  .refine(
    data => {
      // If user is pregnant, months field is required
      if (data.isPregnant === true) {
        return data.months !== undefined && data.months !== '';
      }
      return true;
    },
    {
      message: 'Pregnancy months is required when pregnant',
      path: ['months'],
    },
  );

export interface TalentProfileSetupFormData
  extends z.infer<typeof talentProfileSetupSchema> {}

export interface TalentProfileSetupFormState {
  isUpdating: boolean;
}

export interface TalentProfileSetupFormProps {
  onSuccess?: () => void;
  onFormStateChange?: (state: TalentProfileSetupFormState) => void;
}

export interface TalentProfileSetupFormRef {
  onSubmit: () => void;
}
