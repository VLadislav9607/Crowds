import { COLORS, ColorsKeys } from '@styles';

export const hospitality = (
  color: ColorsKeys = 'black',
) => `<svg viewBox="0 0 24 24" fill="none" stroke="${COLORS[color]}" stroke-width="2">
  <path d="M3 21h18"/>
  <path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/>
  <path d="M9 21v-6h6v6"/>
</svg>
`;
