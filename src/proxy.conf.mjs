import config from '../tools/config.mjs';

const appConfig = config();

export default {
  '/api': {
    target: 'https://api.user-feedback.oups.net/api', // appConfig.apiUrlWithProtocol
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
  },
};
