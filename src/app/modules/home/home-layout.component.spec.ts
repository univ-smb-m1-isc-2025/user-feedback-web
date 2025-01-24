import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { HomeLayoutComponent } from './home-layout.component';

describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore()],
    });

    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate on click on init', () => {
    router.navigate = jest.fn();

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/', 'projects']);
  });
});
