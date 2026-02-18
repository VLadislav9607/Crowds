import { OfficeMembershipDto } from '@actions';
import { getCountryNameByCode } from '@helpers';

export interface OfficeCountry {
  code: string;
  name: string;
  officeId: string;
}

export const getOfficeCountries = (
  offices: OfficeMembershipDto[],
): OfficeCountry[] => {
  const seen = new Set<string>();
  const result: OfficeCountry[] = [];

  for (const office of offices) {
    const code = office.country_code.toUpperCase();
    if (!seen.has(code)) {
      seen.add(code);
      result.push({
        code,
        name: getCountryNameByCode(code),
        officeId: office.office_id,
      });
    }
  }

  return result;
};

export const findOfficeByCountryCode = (
  offices: OfficeMembershipDto[],
  countryCode: string,
): OfficeMembershipDto | undefined => {
  return offices.find(
    o => o.country_code.toUpperCase() === countryCode.toUpperCase(),
  );
};

export const validateOfficeAccess = (
  offices: OfficeMembershipDto[],
  countryCode: string,
): { valid: boolean; officeId?: string; error?: string } => {
  const matchedOffice = findOfficeByCountryCode(offices, countryCode);

  if (!matchedOffice) {
    return {
      valid: false,
      error: "Your organization doesn't have an office in this country",
    };
  }

  const hasCreateCapability = matchedOffice.capabilities.some(
    cap => cap === 'create_events' || cap === 'create_event_draft',
  );

  if (!hasCreateCapability) {
    return {
      valid: false,
      error: "You don't have permission to create events in this country",
    };
  }

  return { valid: true, officeId: matchedOffice.office_id };
};
