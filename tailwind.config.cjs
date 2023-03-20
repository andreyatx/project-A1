/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#146C94',

					secondary: '#778DA9',

					neutral: '#3D4451',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
