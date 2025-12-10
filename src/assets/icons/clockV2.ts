import { COLORS, ColorsKeys } from '@styles';

export const clockV2 = (color: ColorsKeys = 'main') => `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.1005 9.8995 1.75 7 1.75C4.1005 1.75 1.75 4.1005 1.75 7C1.75 9.8995 4.1005 12.25 7 12.25Z" stroke="${COLORS[color]}" stroke-width="0.875"/>
<path d="M9.625 7.00007H7.14583C7.06527 7.00007 7 6.9348 7 6.85424V4.9584" stroke="${COLORS[color]}" stroke-width="0.875" stroke-linecap="round"/>
</svg>
`;
