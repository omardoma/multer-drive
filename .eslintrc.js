module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all'
      }
    ],
    'consistent-return': 0,
    'no-throw-literal': 0,
    'prefer-promise-reject-errors': 0,
    'default-case': 0
  }
};
