const path = require('path');
const { override, addLessLoader, addWebpackAlias } = require('customize-cra');

const overrideProcessEnv = (value) => (config) => {
  config.resolve.modules = [path.join(__dirname, 'src')].concat(config.resolve.modules);
  return config;
};

module.exports = override(
  addLessLoader({
    javascriptEnabled: true
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version)
  }),
  addWebpackAlias({
    ["@components"]: path.resolve(__dirname, "./src/components"),
    "@uielements": path.resolve(__dirname, "./src/components/uielements"),
    ["@util"]: path.resolve(__dirname, "./src/util"),
    ["@constants"]: path.resolve(__dirname, "./src/constants"),
    ["@assets"]: path.resolve(__dirname, "./src/assets"),
    ["@appRedux"]: path.resolve(__dirname, "./src/appRedux"),
  })
);
