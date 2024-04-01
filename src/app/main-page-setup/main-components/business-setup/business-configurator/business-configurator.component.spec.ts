import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessConfiguratorComponent } from './business-configurator.component';

describe('BusinessConfiguratorComponent', () => {
  let component: BusinessConfiguratorComponent;
  let fixture: ComponentFixture<BusinessConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessConfiguratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
