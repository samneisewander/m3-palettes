import {
    SchemeContent,
    SchemeExpressive,
    SchemeFidelity,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeTonalSpot,
    SchemeVibrant,
} from "@material/material-color-utilities"

/**
 * Union type of all Material Color Utilities pallette generation classes
 */
export type SchemeType = typeof SchemeContent | typeof SchemeExpressive | typeof SchemeFidelity | typeof SchemeMonochrome | typeof SchemeNeutral | typeof SchemeTonalSpot | typeof SchemeVibrant

/**
 * Union type of string aliases for Material Color Utilities pallette generation classes
 */
export type SchemeStringType = 'content' | 'expressive' | 'fidelity' | 'monochrome' | 'neutral' | 'tonalSpot' | 'vibrant'

/**
 * An object literal with keys corresponding to each Material 3 color roles
 * and values that are hex color strings.
 * 
 * i.e `"background": "#ffffff"`
 */
export type M3Pallette = {[Member in M3ColorRole]: string}

/**
 * Union type of string aliases for one of the Material 3 color roles.
 * 
 * See 
 */
export type M3ColorRole = 
    "background" |
    "on-background" |
    "surface" |
    "surface-dim" |
    "surface-bright" |
    "surface-container-lowest" |
    "surface-container-low" |
    "surface-container" |
    "surface-container-high" |
    "surface-container-highest" |
    "on-surface" |
    "surface-variant" |
    "on-surface-variant" |
    "inverse-surface" |
    "inverse-on-surface" |
    "outline" |
    "outline-variant" |
    "surface-tint" |
    "primary" |
    "on-primary" |
    "primary-container" |
    "on-primary-container" |
    "inverse-primary" |
    "secondary" |
    "on-secondary" |
    "secondary-container" |
    "on-secondary-container" |
    "tertiary" |
    "on-tertiary" |
    "tertiary-container" |
    "on-tertiary-container" |
    "error" |
    "on-error" |
    "error-container" |
    "on-error-container" |
    "scrim" |
    "shadow"