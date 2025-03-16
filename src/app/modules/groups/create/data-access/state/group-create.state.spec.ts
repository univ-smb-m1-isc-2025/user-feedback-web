import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpTesting } from 'uf/testing/providers';

import { GroupCreateState, initialState } from './group-create.state';

describe('GroupCreateState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpTesting(), provideStore([GroupCreateState])],
    });

    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    const state = store.selectSnapshot((state) => state.groupCreate);
    expect(state).toStrictEqual(initialState);
  });
});
