const {PROJECT_NAME, PROJECT_TYPE} = require('./env.json');

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = `${PROJECT_NAME} ${PROJECT_TYPE}`; // browser app title
      return args;
    });
  },
  pwa: {
    name: `${PROJECT_NAME} ${PROJECT_TYPE}`, // pwa app name
  },
};
