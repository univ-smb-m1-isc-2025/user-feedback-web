import { TestBed } from '@angular/core/testing';
import { provideHttpTesting } from 'uf/testing/providers';

import { GroupCreateService } from './group-create.service';

describe('GroupCreateService', () => {
  let service: GroupCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpTesting()],
    });

    service = TestBed.inject(GroupCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
