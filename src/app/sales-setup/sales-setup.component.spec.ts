import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSetupComponent } from './sales-setup.component';

describe('SalesSetupComponent', () => {
  let component: SalesSetupComponent;
  let fixture: ComponentFixture<SalesSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesSetupComponent]
    });
    fixture = TestBed.createComponent(SalesSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
