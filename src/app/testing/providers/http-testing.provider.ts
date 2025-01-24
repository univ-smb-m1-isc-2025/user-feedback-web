import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { API_URL } from 'uf/shared/data-access';

export function provideHttpTesting(): (EnvironmentProviders | Provider)[] {
  return [
    {
      provide: API_URL,
      useValue: '',
    },
    provideHttpClient(),
    provideHttpClientTesting(),
  ];
}
