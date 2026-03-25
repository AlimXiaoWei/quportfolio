/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'bg-base': '#0D0D1A',
				'bg-panel': '#1A1830',
				'qu-purple': '#7B5CF5',
				'qu-cyan': '#00EAFF',
				'qu-green': '#00FF9C',
				'qu-pink': '#FF2D7A',
			},
			fontFamily: {
				mono: ['Share Tech Mono', 'monospace'],
				rajdhani: ['Rajdhani', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
