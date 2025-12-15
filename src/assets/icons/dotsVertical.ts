import { ColorsKeys } from '@styles';

export const dotsVertical = (color: ColorsKeys = 'black') => `
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5">
<path d="M11.4397 12.393C11.9662 12.393 12.393 11.9662 12.393 11.4397C12.393 10.9131 11.9662 10.4863 11.4397 10.4863C10.9131 10.4863 10.4863 10.9131 10.4863 11.4397C10.4863 11.9662 10.9131 12.393 11.4397 12.393Z" fill="${color}" stroke="${color}" stroke-width="2.08" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.4397 5.71917C11.9662 5.71917 12.393 5.29234 12.393 4.76583C12.393 4.23932 11.9662 3.8125 11.4397 3.8125C10.9131 3.8125 10.4863 4.23932 10.4863 4.76583C10.4863 5.29234 10.9131 5.71917 11.4397 5.71917Z" fill="${color}" stroke="${color}" stroke-width="2.08" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.4397 19.0668C11.9662 19.0668 12.393 18.64 12.393 18.1135C12.393 17.587 11.9662 17.1602 11.4397 17.1602C10.9131 17.1602 10.4863 17.587 10.4863 18.1135C10.4863 18.64 10.9131 19.0668 11.4397 19.0668Z" fill="${color}" stroke="${color}" stroke-width="2.08" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`;
