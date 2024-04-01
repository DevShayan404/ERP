import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDialogueComponent } from './proposal-dialogue.component';

describe('ProposalDialogueComponent', () => {
  let component: ProposalDialogueComponent;
  let fixture: ComponentFixture<ProposalDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposalDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
