module.exports = {
  "root": true,
  parser: "babel-eslint",
  "extends": [
    "standard",
    "standard-react",
    "prettier",
    "prettier/react"
  ],
  plugins: [
    "babel",
    "react",
    "prettier",
    "react-hooks"
  ],
  env: {
    "browser": true,
    "es6": true
  },
  rules: {
    semi: [2,"never"],
    "no-console": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "none",
        "semi": false,
        "bracketSpacing": true,
        "jsxBracketSameLine": true,
        "printWidth": 80,
        "tabWidth": 2,
        "useTabs": false
      }
    ]
  }
}