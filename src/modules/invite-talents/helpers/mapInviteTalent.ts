import { TalentFlag, IEventParticipant } from '@modules/common';

interface TalentWithLocationObject {
  id: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  location?: {
    city?: string;
    country?: string;
  };
}

interface TalentWithCityCountry {
  id: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  city: string;
  country: string;
}

type TalentInput = TalentWithLocationObject | TalentWithCityCountry;

export const mapInviteTalent = (
  talent: TalentInput,
  flag: TalentFlag = TalentFlag.GREEN,
): IEventParticipant => {
  let location = '';

  if ('location' in talent && talent.location) {
    // Handle location object format
    const city = talent.location.city || '';
    const country = talent.location.country || '';
    const locationParts = [city, country].filter(Boolean);
    location = locationParts.join(', ') || '';
  } else if ('city' in talent && 'country' in talent) {
    // Handle direct city/country format
    const city = talent.city || '';
    const country = talent.country || '';
    const locationParts = [city, country].filter(Boolean);
    location = locationParts.join(', ') || '';
  }

  return {
    talentId: talent.id,
    name: `${talent.first_name} ${talent.last_name}`.trim(),
    location,
    avatarUrl: talent.avatar_path,
    flag,
  };
};
