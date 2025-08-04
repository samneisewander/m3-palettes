import {
    argbFromHex,
    hexFromArgb,
    Hct,
    MaterialDynamicColors,
    DynamicColor,
} from "@material/material-color-utilities"
import { M3ColorRole, M3Pallette, SchemeType } from "./types.js";

const AllMaterialDynamicColors: { [Member in M3ColorRole]: DynamicColor } = {
    "primary": MaterialDynamicColors.primary,
    "surface-tint": MaterialDynamicColors.surfaceTint,
    "on-primary": MaterialDynamicColors.onPrimary,
    "primary-container": MaterialDynamicColors.primaryContainer,
    "on-primary-container": MaterialDynamicColors.onPrimaryContainer,
    "secondary": MaterialDynamicColors.secondary,
    "on-secondary": MaterialDynamicColors.onSecondary,
    "secondary-container": MaterialDynamicColors.secondaryContainer,
    "on-secondary-container": MaterialDynamicColors.    onSecondaryContainer,
    "tertiary": MaterialDynamicColors.tertiary,
    "on-tertiary": MaterialDynamicColors.onTertiary,
    "tertiary-container": MaterialDynamicColors.tertiaryContainer,
    "on-tertiary-container": MaterialDynamicColors. onTertiaryContainer,
    "error": MaterialDynamicColors.error,
    "on-error": MaterialDynamicColors.onError,
    "error-container": MaterialDynamicColors.errorContainer,
    "on-error-container": MaterialDynamicColors.onErrorContainer,
    "background": MaterialDynamicColors.background,
    "on-background": MaterialDynamicColors.onBackground,
    "surface": MaterialDynamicColors.surface,
    "on-surface": MaterialDynamicColors.onSurface,
    "surface-variant": MaterialDynamicColors.surfaceVariant,
    "on-surface-variant": MaterialDynamicColors.onSurfaceVariant,
    "outline": MaterialDynamicColors.outline,
    "outline-variant": MaterialDynamicColors.outlineVariant,
    "shadow": MaterialDynamicColors.shadow,
    "scrim": MaterialDynamicColors.scrim,
    "inverse-surface": MaterialDynamicColors.inverseSurface,
    "inverse-on-surface": MaterialDynamicColors.inverseOnSurface,
    "inverse-primary": MaterialDynamicColors.inversePrimary,
    "primary-fixed": MaterialDynamicColors.primaryFixed,
    "on-primary-fixed": MaterialDynamicColors.onPrimaryFixed,
    "primary-fixed-dim": MaterialDynamicColors.primaryFixedDim,
    "on-primary-fixed-variant": MaterialDynamicColors.  onPrimaryFixedVariant,
    "secondary-fixed": MaterialDynamicColors.secondaryFixed,
    "on-secondary-fixed": MaterialDynamicColors.onSecondaryFixed,
    "secondary-fixed-dim": MaterialDynamicColors.secondaryFixedDim,
    "on-secondary-fixed-variant": MaterialDynamicColors.    onSecondaryFixedVariant,
    "tertiary-fixed": MaterialDynamicColors.tertiaryFixed,
    "on-tertiary-fixed": MaterialDynamicColors.onTertiaryFixed,
    "tertiary-fixed-dim": MaterialDynamicColors.tertiaryFixedDim,
    "on-tertiary-fixed-variant": MaterialDynamicColors. onTertiaryFixedVariant,
    "surface-dim": MaterialDynamicColors.surfaceDim,
    "surface-bright": MaterialDynamicColors.surfaceBright,
    "surface-container-lowest": MaterialDynamicColors.  surfaceContainerLowest,
    "surface-container-low": MaterialDynamicColors. surfaceContainerLow,
    "surface-container": MaterialDynamicColors.surfaceContainer,
    "surface-container-high": MaterialDynamicColors.    surfaceContainerHigh,
    "surface-container-highest": MaterialDynamicColors.surfaceContainerHighest
}

/**
 * @param colorsMap Values must be hex color strings and 'primary' must be present.
 * @param SchemeObject The scheme by which to generate the palette.
 * @param contrast A number ranging from - 1 (less contrast) to 1 (more contrast).
 * 
 * @returns Object literal where keys are the css variable names for each color role and the 
 * values are hex color strings 
 * 
 */
export const tailwindThemeFromColor = (primary: string, SchemeObject: SchemeType, contrast: number, darkMode: boolean) => {
    const source = argbFromHex(primary)

    const scheme = new SchemeObject(Hct.fromInt(source), darkMode, contrast)

    // Initialize the color pallete to be filled out and returned
    let colors: M3Pallette = {
        "primary": "#000000",
        "surface-tint": "#000000",
        "on-primary": "#000000",
        "primary-container": "#000000",
        "on-primary-container": "#000000",
        "secondary": "#000000",
        "on-secondary": "#000000",
        "secondary-container": "#000000",
        "on-secondary-container": "#000000",
        "tertiary": "#000000",
        "on-tertiary": "#000000",
        "tertiary-container": "#000000",
        "on-tertiary-container": "#000000",
        "error": "#000000",
        "on-error": "#000000",
        "error-container": "#000000",
        "on-error-container": "#000000",
        "background": "#000000",
        "on-background": "#000000",
        "surface": "#000000",
        "on-surface": "#000000",
        "surface-variant": "#000000",
        "on-surface-variant": "#000000",
        "outline": "#000000",
        "outline-variant": "#000000",
        "shadow": "#000000",
        "scrim": "#000000",
        "inverse-surface": "#000000",
        "inverse-on-surface": "#000000",
        "inverse-primary": "#000000",
        "primary-fixed": "#000000",
        "on-primary-fixed": "#000000",
        "primary-fixed-dim": "#000000",
        "on-primary-fixed-variant": "#000000",
        "secondary-fixed": "#000000",
        "on-secondary-fixed": "#000000",
        "secondary-fixed-dim": "#000000",
        "on-secondary-fixed-variant": "#000000",
        "tertiary-fixed": "#000000",
        "on-tertiary-fixed": "#000000",
        "tertiary-fixed-dim": "#000000",
        "on-tertiary-fixed-variant": "#000000",
        "surface-dim": "#000000",
        "surface-bright": "#000000",
        "surface-container-lowest": "#000000",
        "surface-container-low": "#000000",
        "surface-container": "#000000",
        "surface-container-high": "#000000",
        "surface-container-highest": "#000000",
    }

    Object.entries(AllMaterialDynamicColors).forEach(([name, DynamicColor]) => {
        const hex = hexFromArgb(DynamicColor.getArgb(scheme))
        const colorRole = name as M3ColorRole
        colors[colorRole] = hex
    })

    return colors;
};
