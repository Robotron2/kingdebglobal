/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			// colors: {
			// 	primary: "#62A4A6",
			// 	secondary: "#0F4A4C",
			// 	tertiary: "#214633",
			// },
			container: {
				center: true,
				padding: {
					DEFAULT: "0.5rem",
					sm: "3rem",
				},
			},
		},
	},
	daisyui: {
		themes: true,
	},
	plugins: [require("daisyui")],
}
