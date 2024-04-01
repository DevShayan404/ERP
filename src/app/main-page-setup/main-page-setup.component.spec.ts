import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageSetupComponent } from './main-page-setup.component';

describe('MainPageSetupComponent', () => {
  let component: MainPageSetupComponent;
  let fixture: ComponentFixture<MainPageSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageSetupComponent]
    });
    fixture = TestBed.createComponent(MainPageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
