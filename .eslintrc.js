module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'plugin:jest/style'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'global-require': 'off',
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')], // https://stackoverflow.com/q/39114446/2771889
  },
};
