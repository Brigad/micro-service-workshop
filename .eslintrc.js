const fs = require('fs');
const path = require('path');

const aliases = fs
  .readdirSync(path.join(__dirname, './packages/'))
  .map((pkg) => [`@workshop/${pkg}`, path.resolve(__dirname, './packages', pkg, './src/index.ts')]);

const camelCase = [
  {
    selector: 'default',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'variable',
    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'enumMember',
    format: ['UPPER_CASE'],
  },
  {
    selector: 'parameter',
    format: ['camelCase', 'snake_case'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'memberLike',
    format: ['camelCase', 'UPPER_CASE', 'snake_case'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'property',
    format: [],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'typeLike',
    format: ['PascalCase'],
  },
  {
    selector: 'function',
    format: ['camelCase', 'PascalCase'],
  },
];

const tsConfig = {
  files: ['*.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/unified-signatures': ['error'],
    'import/no-unresolved': [2, { ignore: ['type-fest'] }],
    'no-void': 'off',
    'no-empty-function': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': ['off'],
    camelcase: ['off'],
    'no-shadow': ['off'],
    'no-array-constructor': ['off'],
    'no-useless-constructor': ['off'],
    curly: [2, 'all'],
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/consistent-type-definitions': ['off'],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { 'array-type': [true, 'array'] }],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-type-alias': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'class-methods-use-this': 'off',
    '@typescript-eslint/naming-convention': ['error', ...camelCase],
  },
};

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'import/first': ['error', 'absolute-first'],
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'import/extensions': ['error', 'never'],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true },
        groups: [
          '/^(@nest).*/',
          // node_modules
          ['module', '/^sequelize-typescript/.*/'],
          // Brigad
          '/^(@workshop).*/',
          // All Other Global Modules
          '/^[^.].*/',
          // Modules
          '/^.?./.[a-z-]*$/',
          // Components
          '/^.*.component/',
          // Clients
          '/^.*.client/',
          // Controllers & Resolvers
          '/^.*.(controller|resolver)/',
          // Models
          '/^.*.model/',
          // Schemas
          '/^.*.schema/',
          // Types
          '/^.*.type/',
          // Local components
          '/^[.]+/(.(?!\\.(s?css|jpe?g|png|svg|gql|styles|json)$))+$/',
        ],
      },
    ],
    'no-console': 'error',
  },
  overrides: [
    tsConfig,
    {
      ...tsConfig,
      files: ['*.model.ts'],
      rules: {
        ...tsConfig.rules,
        'max-classes-per-file': 'off',
      },
    },
    {
      ...tsConfig,
      files: ['*.type.ts'],
      rules: {
        ...tsConfig.rules,
        'max-classes-per-file': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      ...tsConfig,
      files: ['*.resolvers.ts'],
      rules: {
        ...tsConfig.rules,
        'max-classes-per-file': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      },
    },
    {
      ...tsConfig,
      files: ['*.component.ts'],
      rules: {
        ...tsConfig.rules,
        'no-underscore-dangle': 'off',
      },
    },
    {
      ...tsConfig,
      files: ['*.dataloaders.ts'],
      rules: {
        ...tsConfig.rules,
        'max-classes-per-file': 'off',
      },
    },
  ],
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      alias: {
        map: aliases,
        extensions: ['.ts'],
      },
    },
  },
};
