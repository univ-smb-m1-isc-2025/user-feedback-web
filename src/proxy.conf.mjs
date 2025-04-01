import config from '../tools/config.mjs';

const appConfig = config();

export default {
  '/api': {
    target: appConfig.apiUrlWithProtocol,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
  },
};
