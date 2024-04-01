import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProposalPreviewComponent } from './client-proposal-preview.component';

describe('ClientProposalPreviewComponent', () => {
  let component: ClientProposalPreviewComponent;
  let fixture: ComponentFixture<ClientProposalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientProposalPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientProposalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
