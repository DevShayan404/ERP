import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadRequestDailogComponent } from './lead-request-dailog.component';

describe('LeadRequestDailogComponent', () => {
  let component: LeadRequestDailogComponent;
  let fixture: ComponentFixture<LeadRequestDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadRequestDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadRequestDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
