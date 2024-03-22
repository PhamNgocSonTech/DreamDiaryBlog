const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   /**
  //    * Ignore icons in the regular SVG rule
  //    *
  //    * It is necessary to use RegExp rather than a string literal
  //    * as WebPack complained about '!' being a reserved character
  //    * when using literals
  //    */
  //   config.module
  //     .rule("svg")
  //     .test(new RegExp(/^((?!\/icons\/).)*(svg)(\?.*)?$/));

  //   //Create a new rule for icons that converts them into Vue templates
  //   const svgIconRule = config.module
  //     .rule("svg-icon")
  //     .test(new RegExp(/^.*(\/icons\/).*(svg)(\?.*)?$/));

  //   svgIconRule.uses.clear();
  //   svgIconRule.delete("type");
  //   svgIconRule.delete("generator");

  //   //Add replacement loader
  //   svgIconRule
  //     .use("vue-loader")
  //     .loader("vue-loader")
  //     .end()
  //     .use("vue-svg-loader")
  //     .loader("vue-svg-loader")
  //     .end();
  // },
});
