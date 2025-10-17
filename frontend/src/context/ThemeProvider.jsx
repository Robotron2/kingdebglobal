import { useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		// Load saved theme or detect system preference
		const saved = localStorage.getItem("theme")
		if (saved) return saved

		// Detect system theme
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
		return prefersDark ? "dark" : "light"
	})

	// Apply theme and persist to localStorage
	useEffect(() => {
		if (theme === "system") {
			const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
			document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
		} else {
			document.documentElement.setAttribute("data-theme", theme)
		}
		localStorage.setItem("theme", theme)
	}, [theme])

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
