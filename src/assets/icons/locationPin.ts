import { COLORS, ColorsKeys } from '@styles';
export const locationPin = (color: ColorsKeys = 'black') => `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9992 19.25C14.2075 15.95 17.4159 12.995 17.4159 9.35C17.4159 5.70492 14.543 2.75 10.9992 2.75C7.45536 2.75 4.58252 5.70492 4.58252 9.35C4.58252 12.995 7.79085 15.95 10.9992 19.25Z" stroke="${COLORS[color]}" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 11.9167C12.5188 11.9167 13.75 10.6856 13.75 9.16675C13.75 7.64797 12.5188 6.41675 11 6.41675C9.48117 6.41675 8.25 7.64797 8.25 9.16675C8.25 10.6856 9.48117 11.9167 11 11.9167Z" stroke="${COLORS[color]}" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;