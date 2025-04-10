import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { UsersSignUpPageComponent } from './users-sign-up-page.component';

describe('UsersSignUpPageComponent', () => {
  let component: UsersSignUpPageComponent;
  let fixture: ComponentFixture<UsersSignUpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(), provideRouter([])],
    });

    fixture = TestBed.createComponent(UsersSignUpPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
