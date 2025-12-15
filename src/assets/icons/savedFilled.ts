import { COLORS, ColorsKeys } from "@styles";

export const savedFilled = (
  color: ColorsKeys,
) => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.375 16.3125V2.3125C3.375 1.83125 3.54635 1.41927 3.88906 1.07656C4.23177 0.733854 4.64375 0.5625 5.125 0.5625H13.875C14.3562 0.5625 14.7682 0.733854 15.1109 1.07656C15.4536 1.41927 15.625 1.83125 15.625 2.3125V16.3125L9.5 13.6875L3.375 16.3125Z" fill="${COLORS[color]}"/>
</svg>
`;