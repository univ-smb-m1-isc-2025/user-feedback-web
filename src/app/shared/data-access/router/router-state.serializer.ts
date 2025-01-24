import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngxs/router-plugin';

import { CustomRouterStateSnapshot } from './router-state.model';

export class CustomRouterStateSerializer
  implements RouterStateSerializer<CustomRouterStateSnapshot>
{
  serialize(routerState: RouterStateSnapshot): CustomRouterStateSnapshot {
    let params: Record<string, string> = {};
    const { url } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
      params = { ...params, ...route.params };
    }

    return { url, params };
  }
}
