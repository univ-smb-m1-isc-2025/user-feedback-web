import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { UsersSignInPageComponent } from './users-sign-in-page.component';

describe('UsersSignInPageComponent', () => {
  let component: UsersSignInPageComponent;
  let fixture: ComponentFixture<UsersSignInPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(), provideRouter([])],
    });

    fixture = TestBed.createComponent(UsersSignInPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
