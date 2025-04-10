import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { provideHttpTesting } from 'uf/testing/providers';

import { ChangeProfilePictureDialogComponent } from './change-profile-picture-dialog.component';

describe('ChangeProfilePictureDialogComponent', () => {
  let component: ChangeProfilePictureDialogComponent;
  let fixture: ComponentFixture<ChangeProfilePictureDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpTesting(), provideStore()],
    });

    fixture = TestBed.createComponent(ChangeProfilePictureDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
