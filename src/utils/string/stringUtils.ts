/**
 * Capitalize the first letter of a string
 * @param str - The string to capitalize
 * @returns String with first letter capitalized
 */
export const capitalize = (str: string | undefined | null): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize each word in a string
 * @param str - The string to capitalize
 * @returns String with each word capitalized
 */
export const capitalizeWords = (str: string | undefined | null): string => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

