import { Params } from '@angular/router';

export type UfRoute = (string | number)[];

export interface CustomRouterStateSnapshot {
  url: string;
  params: Params;
}

export interface CustomRouterStateModel {
  state: CustomRouterStateSnapshot;
  navigationId: number;
}
