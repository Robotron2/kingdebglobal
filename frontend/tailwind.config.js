/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// export default {
// 	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {
// 			colors: {
// 				primary: "#557B3F",
// 				secondary: "#66944C",
// 				tertiary: "#7CB35C",
// 				accent: "#E3AF32",
// 			},
// 			container: {
// 				center: true,
// 				padding: "0.5rem",
// 				screens: {
// 					xl: "1200px",
// 					"2xl": "1400px",
// 				},
// 			},
// 		},
// 	},
// 	daisyui: {
// 		themes: [
// 			{
// 				light: {
// 					"color-scheme": "light",
// 					primary: "#557B3F",
// 					"primary-content": "#ffffff",
// 					secondary: "#66944C",
// 					accent: "#E3AF32",
// 					neutral: "#E2E8F0",
// 					"base-100": "#F7F7F4", // ✅ softer off-white
// 					"base-200": "#EEEDEB",
// 					"base-300": "#E4E3E1",
// 					"base-content": "#1E293B",
// 				},
// 				dark: {
// 					"color-scheme": "dark",
// 					primary: "#557B3F",
// 					secondary: "#66944C",
// 					accent: "#E3AF32",
// 					"base-100": "#0F172A",
// 					"base-200": "#1E293B",
// 					"base-300": "#334155",
// 					"base-content": "#F1F5F9",
// 				},
// 			},
// 		],
// 	},
// 	plugins: [require("daisyui")],
// }

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
				accentLight: "#f4dba1", // pineapple gold
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
	// daisyui: {
	// 	themes: [
	// 		{
	// 			light: {
	// 				...require("daisyui/src/theming/themes")["light"],
	// 				"color-scheme": "light",
	// 				primary: "#557B3F",
	// 				"primary-content": "#ffffff",
	// 				secondary: "#66944C",
	// 				accent: "#E3AF32",
	// 				neutral: "#E2E8F0",
	// 				"base-100": "#F7F7F4", // ✅ softer off-white
	// 				"base-200": "#EEEDEB",
	// 				"base-300": "#E4E3E1",
	// 				"base-content": "#1E293B",
	// 			},
	// 			dark: {
	// 				...require("daisyui/src/theming/themes")["dark"],
	// 				"color-scheme": "dark",
	// 				primary: "#557B3F",
	// 				secondary: "#66944C",
	// 				accent: "#E3AF32",
	// 				"base-100": "#0F172A",
	// 				"base-200": "#1E293B",
	// 				"base-300": "#334155",
	// 				"base-content": "#F1F5F9",
	// 			},
	// 		},
	// 	],
	// },
	plugins: [require("daisyui")],
}
