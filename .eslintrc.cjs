module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
  },
}
