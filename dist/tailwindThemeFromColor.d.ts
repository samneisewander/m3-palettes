import { M3Pallette, SchemeType } from "./types.js";
/**
 * @param colorsMap Values must be hex color strings and 'primary' must be present.
 * @param SchemeObject The scheme by which to generate the palette.
 * @param contrast A number ranging from - 1 (less contrast) to 1 (more contrast).
 *
 * @returns Object literal where keys are the css variable names for each color role and the
 * values are hex color strings
 *
 */
export declare const tailwindThemeFromColor: (primary: string, SchemeObject: SchemeType, contrast: number, darkMode: boolean) => M3Pallette;
