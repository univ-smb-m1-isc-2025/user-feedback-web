#!/usr/bin/env node
import { configDotenv } from 'dotenv';

configDotenv();

const getConfig = () => {
  const { env } = process;

  return {
    env,
    bffUrlWithProtocol: `${env.PROTOCOL}://${env.API_ENDPOINT}`
  };
};

export default getConfig;
