import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';

import { GroupCreateDialogComponent } from './group-create-dialog.component';

describe('CreateGroupDialogComponent', () => {
  let component: GroupCreateDialogComponent;
  let fixture: ComponentFixture<GroupCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore()],
    });

    fixture = TestBed.createComponent(GroupCreateDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
