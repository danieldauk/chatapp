module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'no-new': 'off',
    'import/prefer-default-export': 'off',
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'array-bracket-newline': [
      'error',
      {
        minItems: 2
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 1
        },
        ImportDeclaration: {
          minProperties: 5
        }
      }
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true
      }
    ],
    'prefer-promise-reject-errors': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': [
      2,
      {
        props: false
      }
    ],
    'no-return-assign': 'off',
    'no-plusplus': 'off',
    'max-len': [
      'error',
      {
        code: 200,
        ignoreComments: true
      }
    ],
    'prefer-destructuring': 0,
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 2
      }
    ],
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
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
