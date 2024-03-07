module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "tsconfig.json",
  },
  rules: {
    semi: ["off"],
    quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: false }],
    "prefer-const": "error",
    // "no-console": "error", // Return 'error' on Logger introduction
    "comma-dangle": ["warn", "only-multiline"],
    eqeqeq: "error",
    yoda: "error",
    "spaced-comment": ["error", "always", { block: { balanced: true }, exceptions: ["/"] }],
    "capitalized-comments": [
      "error",
      "always",
      {
        ignoreConsecutiveComments: true,
        ignorePattern: 'ms|import|"|`|prettier-ignore|else|public|private|expect|await|f.e.',
      },
    ],
    // Do not allow relative path import. only import from @app/*
    "no-restricted-imports": ["error", { patterns: ["./*", "../*"] }],
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      {
        ignoreParameters: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-default-export": 2,
  },
  ignorePatterns: [".eslintrc.js", "jest.config.js"],
};
