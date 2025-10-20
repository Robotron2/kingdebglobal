/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	// darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#557B3F", // main green
				secondary: "#66944C", // lighter green
				tertiary: "#7CB35C", // soft accent green
				accent: "#E3AF32", // pineapple gold
				"accent-light": "#f4dba1", // pineapple gold
				"muted-light": "#F9F8FA",
				"muted-dark": "#262626",
				"muted-foreground": "#797979",
			},
			container: {
				center: true,
				padding: "0.5rem",
				screens: {
					xl: "1200px",
					"2xl": "1400px",
				},
			},
		},
	},

	plugins: [require("daisyui")],
}
