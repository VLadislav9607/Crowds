import { countriesWithFlag } from '@constants';

export const getCountryNameByCode = (code: string): string => {
  const country = countriesWithFlag.find(
    c => c.code.toUpperCase() === code.toUpperCase(),
  );
  return country?.name || code;
};
