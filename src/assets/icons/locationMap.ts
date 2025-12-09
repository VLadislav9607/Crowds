import { COLORS, ColorsKeys } from '@styles';

export const locationMap = (
  color: ColorsKeys = 'main',
) => `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 11.6667L1.75 9.91671V2.33337L2.91667 2.91671M5.25 11.6667L8.75 9.91671M5.25 11.6667V8.16671M8.75 9.91671L12.25 11.6667V4.08337L11.0833 3.50004M8.75 9.91671V8.16671" stroke="#430B70" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.78358 5.10001C6.05049 5.45201 6.34214 5.84045 6.64844 6.2999C7.04469 5.90365 7.34784 5.54107 7.6525 5.09149C8.18558 4.30485 8.52569 3.30941 8.17399 2.42664C7.88772 1.70807 7.34512 1.3999 6.64844 1.3999C6.4061 1.3999 5.66038 1.5677 5.22454 2.368C4.74469 3.24911 5.17739 4.30055 5.78358 5.10001Z" stroke="${COLORS[color]}" stroke-width="0.875"/>
<circle cx="6.64805" cy="3.32487" r="0.525" fill="${COLORS[color]}"/>
</svg>`;
