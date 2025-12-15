import { COLORS, ColorsKeys } from "@styles";


export const dangerTriangle = (color: ColorsKeys = 'black') => `
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0661 22.4198C17.1461 11.6399 20.186 6.25 25.0001 6.25C29.814 6.25 32.854 11.6399 38.934 22.4198L39.6915 23.7631C44.744 32.721 47.2703 37.2 44.987 40.475C42.7038 43.75 37.0551 43.75 25.7578 43.75H24.2424C12.945 43.75 7.29627 43.75 5.01312 40.475C2.72996 37.2 5.25614 32.721 10.3085 23.7631L11.0661 22.4198Z" stroke="${COLORS[color]}" stroke-width="2.5"/>
<path d="M25 16.6666V27.0833" stroke="${COLORS[color]}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M25.0001 35.4167C26.1507 35.4167 27.0834 34.4839 27.0834 33.3333C27.0834 32.1827 26.1507 31.25 25.0001 31.25C23.8495 31.25 22.9167 32.1827 22.9167 33.3333C22.9167 34.4839 23.8495 35.4167 25.0001 35.4167Z" fill="${COLORS[color]}"/>
</svg>
`