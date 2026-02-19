import { GetAllTalentDto } from '@actions';
import { IEventParticipant, TalentFlag } from '@modules/common';

export const mapTalentToParticipant = (
  talent: GetAllTalentDto,
): IEventParticipant => {
  const city = talent.location?.city || '';
  const country = talent.location?.country || '';
  const locationParts = [city, country].filter(Boolean);

  return {
    talentId: talent.id,
    name: `${talent.first_name} ${talent.last_name}`.trim(),
    location: locationParts.join(', '),
    avatar_url: talent.avatar_path,
    flag: talent.flag || TalentFlag.GREEN,
  };
};
