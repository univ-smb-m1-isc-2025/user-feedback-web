import type { TestEnvironmentOptions } from '@angular/core/testing';

declare global {
  // eslint-disable-next-line no-var
  var ngJest: {
    skipNgcc?: boolean;
    tsconfig?: string;
    testEnvironmentOptions?: TestEnvironmentOptions;
  };
}

export {};
