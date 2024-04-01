import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketConfiguratorComponent } from './ticket-configurator.component';

describe('TicketConfiguratorComponent', () => {
  let component: TicketConfiguratorComponent;
  let fixture: ComponentFixture<TicketConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketConfiguratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
