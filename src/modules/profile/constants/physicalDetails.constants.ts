import {
  Ethnicity,
  Accent,
  EyeColour,
  HairColour,
  FacialAttributes,
  BodyAttributes,
  TattooSpot,
  SkinTone,
  Gender,
} from '../types/physicalDetails.enums';

export const ethnicityOptions = [
  { label: 'Asian', value: Ethnicity.ASIAN },
  { label: 'Caucasian', value: Ethnicity.CAUCASIAN },
  { label: 'African', value: Ethnicity.AFRICAN },
  { label: 'Islander', value: Ethnicity.ISLANDER },
  { label: 'Middle Eastern', value: Ethnicity.MIDDLE_EASTERN },
  { label: 'Indian / South Asian', value: Ethnicity.INDIAN_SOUTH_ASIAN },
  { label: 'Latino / Hispanic', value: Ethnicity.LATINO_HISPANIC },
  { label: 'Mixed', value: Ethnicity.MIXED },
  { label: 'Other / Not Sure', value: Ethnicity.OTHER_NOT_SURE },
];

export const accentOptions = [
  { label: 'Native', value: Accent.NATIVE },
  { label: 'American', value: Accent.AMERICAN },
  { label: 'Foreign', value: Accent.FOREIGN },
  { label: 'Australian', value: Accent.AUSTRALIAN },
  { label: 'European', value: Accent.EUROPEAN },
  { label: 'British', value: Accent.BRITISH },
  { label: 'Indian', value: Accent.INDIAN },
  { label: "Other / Doesn't matter", value: Accent.OTHER_DOESNT_MATTER },
];

export const eyeColourOptions = [
  { label: 'Blue', value: EyeColour.BLUE },
  { label: 'Brown', value: EyeColour.BROWN },
  { label: 'Green', value: EyeColour.GREEN },
  { label: 'Hazel', value: EyeColour.HAZEL },
  { label: 'Black', value: EyeColour.BLACK },
  { label: 'Grey', value: EyeColour.GREY },
  { label: 'Amber', value: EyeColour.AMBER },
  { label: 'Other / Not Sure', value: EyeColour.OTHER_NOT_SURE },
];

export const hairColourOptions = [
  { label: 'Blue', value: HairColour.BLUE },
  { label: 'Brown', value: HairColour.BROWN },
  { label: 'Green', value: HairColour.GREEN },
  { label: 'Dyed / Colored', value: HairColour.DYED_COLORED },
  { label: 'Hazel', value: HairColour.HAZEL },
  { label: 'Black', value: HairColour.BLACK },
  { label: 'Grey / White', value: HairColour.GREY_WHITE },
  { label: 'Amber', value: HairColour.AMBER },
  { label: 'Bald / Shaved', value: HairColour.BALD_SHAVED },
  { label: 'Other / Not Sure', value: HairColour.OTHER_NOT_SURE },
];

export const facialAttributesOptions = [
  { label: 'Birthmark', value: FacialAttributes.BIRTHMARK },
  { label: 'Moles', value: FacialAttributes.MOLES },
  { label: 'Scars', value: FacialAttributes.SCARS },
  { label: 'Freckles', value: FacialAttributes.FRECKLES },
  { label: 'Tattoos', value: FacialAttributes.TATTOOS },
  { label: 'Burns', value: FacialAttributes.BURNS },
];

export const bodyAttributesOptions = [
  { label: 'Tattoos', value: BodyAttributes.TATTOOS },
  { label: 'Birthmarks', value: BodyAttributes.BIRTHMARKS },
  { label: 'Amputations', value: BodyAttributes.AMPUTATIONS },
  { label: 'Scars', value: BodyAttributes.SCARS },
  { label: 'Burns', value: BodyAttributes.BURNS },
];

export const tattooSpotOptions = [
  { label: 'On Sleeves', value: TattooSpot.ON_SLEEVES },
  { label: 'On Body', value: TattooSpot.ON_BODY },
  { label: 'On Neck', value: TattooSpot.ON_NECK },
  { label: 'On Hand', value: TattooSpot.ON_HAND },
];

export const skinToneOptions = [
  { label: 'Porcelain', value: SkinTone.PORCELAIN },
  { label: 'Ivory', value: SkinTone.IVORY },
  { label: 'Warm Ivory', value: SkinTone.WARM_IVORY },
  { label: 'Sand', value: SkinTone.SAND },
  { label: 'Beige', value: SkinTone.BEIGE },
  { label: 'Warm Beige', value: SkinTone.WARM_BEIGE },
  { label: 'Natural', value: SkinTone.NATURAL },
  { label: 'Honey', value: SkinTone.HONEY },
  { label: 'Golden', value: SkinTone.GOLDEN },
  { label: 'Almond', value: SkinTone.ALMOND },
  { label: 'Chestnut', value: SkinTone.CHESTNUT },
  { label: 'Espresso', value: SkinTone.ESPRESSO },
];

export const genderOptions = [
  { label: 'Male', value: Gender.MALE },
  { label: 'Female', value: Gender.FEMALE },
  { label: 'Other', value: Gender.OTHER },
];
