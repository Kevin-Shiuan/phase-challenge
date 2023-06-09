module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "simple-import-sort"],
  rules: {
    "arrow-body-style": "warn",
    "default-param-last": "off",
    "import/no-cycle": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-alert": "off",
    "no-console": "off",
    "no-extra-boolean-cast": "warn",
    "no-nested-ternary": "off",
    "no-new": "off",
    "no-param-reassign": "off",
    "no-restricted-exports": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: false,
      },
    ],
    "no-use-before-define": "off",
    "no-unsafe-optional-chaining": "off",
    "prefer-destructuring": [
      "warn",
      {
        array: false,
        object: true,
      },
    ],
    "react/button-has-type": "warn",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/function-component-definition": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-key": "warn",
    "react/jsx-no-constructed-context-values": "off",
    "react/jsx-no-duplicate-props": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/no-children-prop": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unstable-nested-components": "off",
    "react/no-unused-prop-types": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
};
