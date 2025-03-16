import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { provideStore, Store } from '@ngxs/store';

import { NotifyError, NotifySuccess } from './notification.actions';
import { NotificationState } from './notification.state';

describe('NotificationState', () => {
  let store: Store;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore([NotificationState]),
        provideAnimations(),
        provideNoopAnimations(),
      ],
    });

    store = TestBed.inject(Store);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should open success snackbar on NotifySuccess', () => {
    jest.spyOn(snackBar, 'open');

    store.dispatch(new NotifySuccess('Success'));

    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should open error snackbar on NotifyError', () => {
    jest.spyOn(snackBar, 'open');

    store.dispatch(new NotifyError('Error'));

    expect(snackBar.open).toHaveBeenCalled();
  });
});
