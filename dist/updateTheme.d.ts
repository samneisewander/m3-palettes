import { SchemeStringType } from './types.js';
/**
 * Updates the Material 3 Color theme on the client side. Intended to be called anytime the
 * primary color is changed, the dark/light mode setting is changed, or the contrast mode is
 * changed.
 * @param primary A hex color string from which to generate the color pallette
 * @param scheme A string alias for the desired scheme generation class.
 * @param darkMode Whether or not to generate a light mode or dark mode color pallette
 * @param contrast A number between -1 (less contrast) and 1 (more contrast) that
 * determines the contrast.
 */
export declare function updateTheme(primary: string, scheme: SchemeStringType, darkMode: boolean, contrast: number): void;
