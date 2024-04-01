import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingDataComponent } from './calling-data.component';

describe('CallingDataComponent', () => {
  let component: CallingDataComponent;
  let fixture: ComponentFixture<CallingDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallingDataComponent]
    });
    fixture = TestBed.createComponent(CallingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
