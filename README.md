# tailwind-4-material-colors

A module that integrates Material Design 3 color system with Tailwind 4.x.

## Overview

This module is a fork of [tailwind-material-colors](https://tailwind-material-colors-docs.vercel.app/), which supports the full Material Design 3 color system in Tailwind 3.x. Unfortunately, Tailwind 4.0 introduces breaking changes to the plugin API which makes the original module incompatible (there is a way to make it work using the `@config` and `@plugin` directives in the `index.css` file, but this is kind of a hacky solution [More info](https://tailwindcss.com/docs/functions-and-directives#config-directive)).

This module is intended to port the old module to Tailwind 4.0.

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

## Roadmap
I made this project so that I could write my portfolio website using (parts of) the M3 color system inside Tailwind 4.x. Since Google is no longer funding development on Material Web and since Material 3 Expressive will soon be the design language in vogue, it doesn't seem to make sense to spend a bunch of time and effort coding up state layers and optimizations for this module.

So, I'm probably not going to continue developing this project. Instead, we can hope that the Material team will write a web implementation of the new Expressive components for us to use, which will likely contain a color implementation (although they seem to like scss and not tailwind, which is unfortunate).
