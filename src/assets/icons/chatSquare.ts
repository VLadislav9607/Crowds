import { COLORS, ColorsKeys } from "@styles"



export const chatSquare = (color: ColorsKeys = 'black') => `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 12.5H10.01" stroke="${COLORS[color]}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 12.5H15.01" stroke="${COLORS[color]}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 12.5H20.01" stroke="${COLORS[color]}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.25 16.25V8.75C26.25 6.39298 26.25 5.21446 25.5177 4.48224C24.7855 3.75 23.607 3.75 21.25 3.75H8.75C6.39298 3.75 5.21446 3.75 4.48224 4.48224C3.75 5.21446 3.75 6.39298 3.75 8.75V16.25C3.75 18.607 3.75 19.7855 4.48224 20.5177C5.21446 21.25 6.39298 21.25 8.75 21.25H9.375C9.72018 21.25 10 21.5299 10 21.875V25V25.1874C10 25.6296 10.5017 25.8851 10.8594 25.625L16.3695 21.6176C16.698 21.3787 17.0938 21.25 17.5 21.25H21.25C23.607 21.25 24.7855 21.25 25.5177 20.5177C26.25 19.7855 26.25 18.607 26.25 16.25Z" stroke="${COLORS[color]}" stroke-width="2" stroke-linejoin="round"/>
</svg>
`