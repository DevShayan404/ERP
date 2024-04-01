import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPreviewDialogueComponent } from './proposal-preview-dialogue.component';

describe('ProposalPreviewDialogueComponent', () => {
  let component: ProposalPreviewDialogueComponent;
  let fixture: ComponentFixture<ProposalPreviewDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalPreviewDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposalPreviewDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
