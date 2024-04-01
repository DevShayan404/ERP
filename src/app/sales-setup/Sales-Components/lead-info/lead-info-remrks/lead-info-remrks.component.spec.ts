import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadInfoRemrksComponent } from './lead-info-remrks.component';

describe('LeadInfoRemrksComponent', () => {
  let component: LeadInfoRemrksComponent;
  let fixture: ComponentFixture<LeadInfoRemrksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadInfoRemrksComponent]
    });
    fixture = TestBed.createComponent(LeadInfoRemrksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
