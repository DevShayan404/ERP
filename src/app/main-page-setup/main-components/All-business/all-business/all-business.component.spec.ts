import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBusinessComponent } from './all-business.component';

describe('AllBusinessComponent', () => {
  let component: AllBusinessComponent;
  let fixture: ComponentFixture<AllBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBusinessComponent]
    });
    fixture = TestBed.createComponent(AllBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
