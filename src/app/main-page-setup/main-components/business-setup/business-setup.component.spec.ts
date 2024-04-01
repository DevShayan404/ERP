import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSetupComponent } from './business-setup.component';

describe('BusinessSetupComponent', () => {
  let component: BusinessSetupComponent;
  let fixture: ComponentFixture<BusinessSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessSetupComponent]
    });
    fixture = TestBed.createComponent(BusinessSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
