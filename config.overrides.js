// config-overrides.js
const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add fallback for Node.js core modules
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify"),
  };

  // Add a plugin to provide Node.js core modules in the browser
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
