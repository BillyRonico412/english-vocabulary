/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					default: "#3880FF",
					shade: "#3171e0",
					tint: "#4c8dff",
				},
			},
		},
	},
	plugins: [],
}
