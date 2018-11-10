module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        comments: 120
      }
    ]
  }
};
