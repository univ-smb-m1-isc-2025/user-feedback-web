import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import {
  RouterStateSerializer,
  withNgxsRouterPlugin,
} from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { authInterceptor } from 'uf/core/http-interceptor';
import { NotificationState } from 'uf/core/notification/data-access';
import { AuthState } from 'uf/core/services/auth/state';
import { environment } from 'uf/environments/environment';

import { routes } from './app.routes';
import {
  GroupAddUserState,
  GroupAddUserUiState,
} from './modules/groups/add-user/data-access/state';

import { API_URL } from './shared/data-access';
import { CustomRouterStateSerializer } from './shared/data-access/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore([
      AuthState,
      NotificationState,
      GroupAddUserState,
      GroupAddUserUiState,
    ]),
    provideRouter(routes),
    withNgxsRouterPlugin(),
    withNgxsReduxDevtoolsPlugin({
      disabled: environment.production,
    }),
    { provide: API_URL, useValue: environment.apiBaseUrl },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    provideAnimations(),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
  ],
};
