import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';
// import postcssNesting from "postcss-nesting";

export default {
  plugins: [postcssJitProps(OpenProps)],
};
