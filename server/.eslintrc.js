module.exports = {

  plugins: ['prettier'],

  env: {
    es6: true,
    node: true,
    mocha: true
  },

  parser: 'babel-eslint',

  rules: {

    'prettier/prettier': ['error', {'singleQuote': true}],
    'no-var': 'error',
    'prefer-const': 'error', 
    'array-callback-return': 'warn',
    'default-case': ['error', { commentPattern: '^no default$' }],
    'eqeqeq': ['error', 'smart'],
    'new-parens': 'warn',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-eval': 'warn',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-implied-eval': 'warn',
    'no-iterator': 'warn',
    'no-labels': 'error',
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-mixed-operators': 'warn',
    'no-new-func': 'warn',
    'no-new-object': 'error',
    'no-new-wrappers': 'warn',
    'no-octal-escape': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'warn',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-rename': 'warn',
    'no-with': 'error',
    'no-whitespace-before-property': 'warn',
    'radix': 'warn',
    'rest-spread-spacing': ['warn', 'never'],
    'strict': 'error',
    'unicode-bom': ['warn', 'never']
  },

  extends: ['prettier', 'eslint:recommended']  
};
