import { COLORS, ColorsKeys } from "@styles";

export const saved = (
  color: ColorsKeys,
) => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.25 17.4375V2.4375C2.25 1.92188 2.43359 1.48047 2.80078 1.11328C3.16797 0.746094 3.60938 0.5625 4.125 0.5625H13.5C14.0156 0.5625 14.457 0.746094 14.8242 1.11328C15.1914 1.48047 15.375 1.92188 15.375 2.4375V17.4375L8.8125 14.625L2.25 17.4375ZM4.125 14.5781L8.8125 12.5625L13.5 14.5781V2.4375H4.125V14.5781Z" fill="${COLORS[color]}"/>
</svg>
`;