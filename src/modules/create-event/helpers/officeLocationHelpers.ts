import { countriesWithFlag } from '@constants';
import { OfficeMembershipDto } from '@actions';

export interface OfficeCountry {
  code: string;
  name: string;
  officeId: string;
}

const getCountryNameByCode = (code: string): string => {
  const country = countriesWithFlag.find(
    c => c.code.toUpperCase() === code.toUpperCase(),
  );
  return country?.name || code;
};

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
