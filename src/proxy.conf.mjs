import config from '../tools/config.mjs';

const appConfig = config();

export default {
  '/api': {
    target: appConfig.bffUrlWithProtocol,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
  },
};
