import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityConfiguratorComponent } from './entity-configurator.component';

describe('EntityConfiguratorComponent', () => {
  let component: EntityConfiguratorComponent;
  let fixture: ComponentFixture<EntityConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityConfiguratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
