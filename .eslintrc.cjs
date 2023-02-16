module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'max-len': ['error', 120, 2, { ignoreStrings: true }],
		'simple-import-sort/exports': 'warn',
		'simple-import-sort/imports': 'warn',
		'no-duplicate-imports': 'error',
		'eol-last': ['warn', 'always'],
		'@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
	},
};
