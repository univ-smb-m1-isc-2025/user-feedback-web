import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { PageErrorNotFoundComponent } from './page-error-not-found.component';

describe('PageErrorNotFoundComponent', () => {
  let component: PageErrorNotFoundComponent;
  let fixture: ComponentFixture<PageErrorNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(), provideRouter([])],
    });

    fixture = TestBed.createComponent(PageErrorNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
