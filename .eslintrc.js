module.exports = {
    extends: ['airbnb-base', 'plugin:jest/recommended'],
    plugins: [
      'jest'
    ],
    rules: {
      'comma-dangle': 0,
      'no-console': 0,
      'prefer-promise-reject-errors': 0
    },
    env: {
      'node': true,
      'jest/globals': true
    }
};
