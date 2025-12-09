import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const talentProfileSetupSchema = z
  .object({
    hairColour: z.string().optional(),
    hairStyle: z.string().optional(), // Eye Colour
    eyeColour: z.string().optional(),
    facialAttributes: z.array(z.string()).optional(),
    tattooSpot: z.array(z.string()).optional(),
    ethnicity: z.string().optional(),
    build: z.number().optional(),
    height: z.number().optional(),
    skinTone: z.string().optional(),
    isPregnant: z.boolean().optional(),
    months: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    additionalSkills: z.string().optional(),
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

export type TalentProfileSetupFormData = z.infer<
  typeof talentProfileSetupSchema
>;

const defaultValues: TalentProfileSetupFormData = {
  hairColour: undefined,
  hairStyle: undefined,
  eyeColour: undefined,
  facialAttributes: undefined,
  tattooSpot: undefined,
  ethnicity: undefined,
  build: 70,
  height: 5,
  skinTone: undefined,
  isPregnant: undefined,
  months: undefined,
  categories: undefined,
  tags: undefined,
  additionalSkills: undefined,
};

export const useTalentProfileSetupScreen = () => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TalentProfileSetupFormData>({
    resolver: zodResolver(talentProfileSetupSchema),
    defaultValues,
    mode: 'onBlur',
  });

  // Watch all form values at once to avoid multiple subscriptions

  return {
    control,
    watch,
    setValue,
    getValues,
    errors,
  };
};
