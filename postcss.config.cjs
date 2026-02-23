const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');
// const postcssNesting = require("postcss-nesting");

module.exports = {
  plugins: [postcssJitProps(OpenProps)],
};
