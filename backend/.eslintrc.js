module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
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
        code: 200,
        comments: 200
      }
    ]
  }
};
