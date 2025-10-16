import { type M3Theme, type M3ThemeContext } from "./types.js";
import { useState, createContext, useContext, useEffect, ReactNode } from 'react'
import { generateThemeCss } from './generateThemeCss.js'

const ThemeContext = createContext({ state: {}, actions: {} } as M3ThemeContext);

function ThemeProvider({ initialTheme, children }: { initialTheme: M3Theme, children: ReactNode }) {

    const [theme, setThemeState] = useState<M3Theme>(initialTheme)
    const value = {
        state: { theme },
        actions: { setThemeState, generateThemeCss }
    }

    // Initialize theme in this context
    useEffect(() => {
        generateThemeCss(initialTheme)
    }, [])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    return useContext(ThemeContext)
}

export { ThemeProvider, useTheme }

