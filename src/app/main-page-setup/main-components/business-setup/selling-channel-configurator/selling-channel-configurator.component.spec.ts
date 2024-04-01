import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingChannelConfiguratorComponent } from './selling-channel-configurator.component';

describe('SellingChannelConfiguratorComponent', () => {
  let component: SellingChannelConfiguratorComponent;
  let fixture: ComponentFixture<SellingChannelConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingChannelConfiguratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingChannelConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
