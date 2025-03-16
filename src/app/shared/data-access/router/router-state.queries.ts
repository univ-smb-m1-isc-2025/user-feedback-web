import { RouterState } from '@ngxs/router-plugin';
import { createPropertySelectors, createSelector } from '@ngxs/store';

import {
  CustomRouterStateModel,
  CustomRouterStateSnapshot,
} from './router-state.model';

export const customRouterSlice =
  createPropertySelectors<CustomRouterStateModel>(RouterState);

export const params = createSelector(
  [customRouterSlice.state],
  (routerState: CustomRouterStateSnapshot | undefined) => routerState?.params,
);

export const groupId = createSelector([params], (params) =>
  Number(params?.['groupId']),
);
