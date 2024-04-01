import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadInfoAttachmentsComponent } from './lead-info-attachments.component';

describe('LeadInfoAttachmentsComponent', () => {
  let component: LeadInfoAttachmentsComponent;
  let fixture: ComponentFixture<LeadInfoAttachmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadInfoAttachmentsComponent]
    });
    fixture = TestBed.createComponent(LeadInfoAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
