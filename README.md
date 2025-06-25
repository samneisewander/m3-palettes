# m3-palettes

A module that supports client-side generation of Material 3 color palettes. [View a demo](https://samneisewander.github.io/m3-palettes-demo/).

## Overview

This module is a fork of [tailwind-material-colors](https://tailwind-material-colors-docs.vercel.app/), which supports the full Material Design 3 color system in Tailwind 3.x. Unfortunately, Tailwind 4.0 introduces breaking changes to the plugin API which makes the original module incompatible (there is a way to make it work using the `@config` and `@plugin` directives in the `index.css` file, but this is kind of a hacky solution. [More info](https://tailwindcss.com/docs/functions-and-directives#config-directive)).

Since [tailwind-material-colors](https://tailwind-material-colors-docs.vercel.app/) is no longer being maintained, I salvaged some parts of it and rewrote them in Typescript so that I could have dynamically generated, Material 3 Design compliant color themes on my portfolio website. Since the module cannot directly configure the Tailwind custom color schemes feature as of v4.0, this module isn't really a "tailwind plugin" so much as it is a utiltiy for generating CSS color themes client-side from a source color using the M3 color utilities library.

This module is NOT intended to be a full web implementation of the Material 3 color specification. It does not support state layers or palette generation from a source image. If you are looking for this kind of tool, check out [actify](https://actifyjs.com/), which seems promising as is still active.

I don't intend to continue supporting this tool.

**Supports**
- M3 scheme from source color

**Does not support**
- M3 schemes from image
- State layers
- M3 Expressive

## Usage
Install the module.

Initialize the Material 3 Color Roles in your `index.css` file using the `@theme` directive. If you just wish to use M3 color without support for contrast, dark mode, etc, just generate the initial RGB values using the [Material 3 Theme Builder](https://material-foundation.github.io/material-theme-builder/). 

```css
/* index.css */

@import "tailwindcss";
@theme {
    /* 
        The initial rgb values will probably be immediately overwritten in your deployment
        when the client calls `updateTheme` on page load.
    */
    --color-*: initial;
    --color-primary: rgb(144 74 68);
    --color-surface-tint: rgb(144 74 68);
    --color-on-primary: rgb(255 255 255);
    --color-primary-container: rgb(255 218 214);
    --color-on-primary-container: rgb(115 51 47);
    --color-secondary: rgb(119 86 83);
    --color-on-secondary: rgb(255 255 255);
    --color-secondary-container: rgb(255 218 214);
    --color-on-secondary-container: rgb(93 63 60);
    --color-tertiary: rgb(114 91 46);
    --color-on-tertiary: rgb(255 255 255);
    --color-tertiary-container: rgb(254 222 166);
    --color-on-tertiary-container: rgb(88 68 25);
    --color-error: rgb(186 26 26);
    --color-on-error: rgb(255 255 255);
    --color-error-container: rgb(255 218 214);
    --color-on-error-container: rgb(147 0 10);
    --color-background: rgb(255 248 247);
    --color-on-background: rgb(35 25 24);
    --color-surface: rgb(255 248 247);
    --color-on-surface: rgb(35 25 24);
    --color-surface-variant: rgb(245 221 219);
    --color-on-surface-variant: rgb(83 67 65);
    --color-outline: rgb(133 115 113);
    --color-outline-variant: rgb(216 194 191);
    --color-shadow: rgb(0 0 0);
    --color-scrim: rgb(0 0 0);
    --color-inverse-surface: rgb(57 46 45);
    --color-inverse-on-surface: rgb(255 237 235);
    --color-inverse-primary: rgb(255 179 172);
    --color-primary-fixed: rgb(255 218 214);
    --color-on-primary-fixed: rgb(59 9 8);
    --color-primary-fixed-dim: rgb(255 179 172);
    --color-on-primary-fixed-variant: rgb(115 51 47);
    --color-secondary-fixed: rgb(255 218 214);
    --color-on-secondary-fixed: rgb(44 21 19);
    --color-secondary-fixed-dim: rgb(231 189 184);
    --color-on-secondary-fixed-variant: rgb(93 63 60);
    --color-tertiary-fixed: rgb(254 222 166);
    --color-on-tertiary-fixed: rgb(38 25 0);
    --color-tertiary-fixed-dim: rgb(225 195 140);
    --color-on-tertiary-fixed-variant: rgb(88 68 25);
    --color-surface-dim: rgb(232 214 212);
    --color-surface-bright: rgb(255 248 247);
    --color-surface-container-lowest: rgb(255 255 255);
    --color-surface-container-low: rgb(255 240 239);
    --color-surface-container: rgb(252 234 232);
    --color-surface-container-high: rgb(246 228 226);
    --color-surface-container-highest: rgb(241 222 220);
}
```

### Updating the theme

To support features like variable contrast, dark mode, or allowing the user to pick the source color for the theme, you will need to use the `updateTheme` module API.

`updateTheme` updates the Material 3 Color theme on the client side. Intended to be called anytime the 
primary color, generation scheme, dark/light mode setting, or the contrast amount is changed.
 * *@param* `primary` A hex color string from which to generate the color pallette
 * *@param* `scheme` A string alias for the desired scheme generation class.
 * *@param* `darkMode` Whether or not to generate a light mode or dark mode color pallette
 * *@param* `contrast` A number between -1 (less contrast) and 1 (more contrast) that determines the contrast. 

Here is an example implementation. The values that might be changed are stored using the `useState` hook. Note that the components that call the various handlers are ommited.

```tsx
// App.tsx
import { useState, useEffect } from 'react'
import { updateTheme, type SchemeStringType } from 'tailwind-4-material-colors'

// Set initial primary color in the useState call
const [color, setColor] = useState('#32a852')

const [contrast, setContrast] = useState(0)

const [scheme, setScheme]: [SchemeStringType, (...args: any[]) => void] = useState('content')
const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
)

// handler for a toggle group that sets the scheme type.
const handleToggleGroupChange = (groupValue: any[]) => {
    if (!groupValue[0]) return
    const scheme = groupValue[0] as SchemeStringType
    setScheme(scheme)
    updateTheme(color, scheme, darkMode, contrast)
}

// handler for a color picker component that sets the primary color
const handleChangeComplete = (newColor: ColorResult) => {
    setColor(newColor.hex)
    updateTheme(newColor.hex, scheme, darkMode, contrast)
}

// handler for a button that toggles light/dark mode
const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    console.log(color)
    updateTheme(color, scheme, !darkMode, contrast)
}

// handler for a button that toggles the contrast ammount
const handleContrastToggle = () => {
    let newContrast = contrast + 0.5
    if (newContrast > 1.0) {
        newContrast = -1
    }
    setContrast(newContrast)
    updateTheme(color, scheme, darkMode, contrast)
}

// Initialize theme on page load
useEffect(() => {
    updateTheme(color, scheme, darkMode, contrast)
}, [])

return(
    // ...tsx page code here
)
```