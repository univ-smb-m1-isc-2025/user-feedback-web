#!/usr/bin/env node
import chalk from 'chalk';
import { configDotenv } from 'dotenv';

import { ProcessWithExit } from './process.js';

declare let process: ProcessWithExit;

configDotenv();

const { env } = process;

export function fileHasError(): void {
  const bold = chalk.bold;
  const error = bold.red;
  const success = chalk.green;

  if (env.PROTOCOL) {
    console.log(success(`✓ PROTOCOL founded ${bold(env.PROTOCOL)}`));
  } else {
    console.log(error('x You must define PROTOCOL value in `.env'));
  }

  if (env.API_ENDPOINT) {
    console.log(
      success(`✓ API ENDPOINT founded ${bold(env.API_ENDPOINT)}`),
    );
  } else {
    console.log(error('x You must define API_ENDPOINT value in `.env`'));
  }
}

fileHasError();
