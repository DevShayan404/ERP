import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyConfiguratorComponent } from './third-party-configurator.component';

describe('ThirdPartyConfiguratorComponent', () => {
  let component: ThirdPartyConfiguratorComponent;
  let fixture: ComponentFixture<ThirdPartyConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPartyConfiguratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdPartyConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
