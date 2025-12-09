import { COLORS, ColorsKeys } from '@styles';

export const plus = (color: ColorsKeys = 'white') => `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99984 2.91666V11.0833M2.9165 7H11.0832" stroke="${COLORS[color]}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
