import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const { paths } = compilerOptions;

// @ts-ignore
globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json',
};

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
    '@angular/common/locales/(.*)$':
      '<rootDir>/node_modules/@angular/common/locales/$1.mjs',
    '^lodash-es$': 'lodash',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*module*.ts',
    '!src/app/**/index.ts',
    '!src/app/**/*.stories.ts',
    '!src/app/testing/**',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test_results/junit',
        addFileAttribute: 'true',
      },
    ],
  ],
};

export default jestConfig;
