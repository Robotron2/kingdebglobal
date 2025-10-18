import { useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		const saved = localStorage.getItem("theme")
		if (saved) return saved

		// Detect system preference if none saved
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
		return prefersDark ? "dark" : "light"
	})

	useEffect(() => {
		const root = document.documentElement

		if (theme === "system") {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
			root.setAttribute("data-theme", prefersDark ? "dark" : "light")
		} else {
			root.setAttribute("data-theme", theme)
		}

		if (theme) localStorage.setItem("theme", theme)
	}, [theme])

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
