const webpack = require('webpack'); // eslint-disable-line
module.exports = {
  configureWebpack: {
    plugins: [ new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /lt/) ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "src/styles/variables.scss";
        @import "src/styles/mixins.scss";`
      }
    }
  }
};
