// override CRA's webpack config using react-app-rewired
// we use this to better our development w/ styled-components
const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  return config;
};
