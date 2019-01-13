module.exports = {
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
