import Color from 'color'
import { tailwindThemeFromColor } from './tailwindThemeFromColor.js'
import { SchemeStringType, SchemeType } from './types.js'
import {
	SchemeContent,
	SchemeExpressive,
	SchemeFidelity,
	SchemeMonochrome,
	SchemeNeutral,
	SchemeTonalSpot,
	SchemeVibrant,
} from "@material/material-color-utilities";

const DYNAMIC_THEME_STYLESHEET_ID = 'tailwind-material-colors-dynamic-theme'

/**
 * Updates the Material 3 Color theme on the client side. Intended to be called anytime the 
 * primary color, generation scheme, dark/light mode setting, or the contrast amount is changed.
 * changed.
 * @param primary A hex color string from which to generate the color pallette
 * @param scheme A string alias for the desired scheme generation class.
 * @param darkMode Whether or not to generate a light mode or dark mode color pallette
 * @param contrast A number between -1 (less contrast) and 1 (more contrast) that 
 * determines the contrast. 
 */
export function updateTheme(
	primary: string,
	scheme: SchemeStringType,
	darkMode: boolean,
	contrast: number,
) {

	const SchemeObjects: { [Member in SchemeStringType]: SchemeType } = {
		content: SchemeContent,
		expressive: SchemeExpressive,
		fidelity: SchemeFidelity,
		monochrome: SchemeMonochrome,
		neutral: SchemeNeutral,
		tonalSpot: SchemeTonalSpot,
		vibrant: SchemeVibrant,
	}

	const SchemeObject = SchemeObjects[scheme]

	let newCSS = ':root {\n' // The docstring that will contain the new css variables

	const colors = tailwindThemeFromColor(primary, SchemeObject, contrast, darkMode)

	Object.entries(colors).forEach(([key, value]) => {
		newCSS += `\t--color-${key}: ${Color(value).rgb()};\n`
	})

	newCSS += '}'

	let stylesheet = document.getElementById(DYNAMIC_THEME_STYLESHEET_ID)
	if (!stylesheet) {
		stylesheet = document.createElement('style')
		stylesheet.id = DYNAMIC_THEME_STYLESHEET_ID
		document.head.appendChild(stylesheet)
	}

	stylesheet.innerText = newCSS
}
