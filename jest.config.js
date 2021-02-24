module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
      '^.+\\.vue$': 'vue-jest'
    },
    testMatch: [
      "**/src/**/*.spec.[jt]s?(x)"
    ],
    transformIgnorePatterns: ["/node_modules/(?!vue-rate-it)"],
  }