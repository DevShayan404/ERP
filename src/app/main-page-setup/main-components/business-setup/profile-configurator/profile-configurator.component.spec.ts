import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConfiguratorComponent } from './profile-configurator.component';

describe('ProfileConfiguratorComponent', () => {
  let component: ProfileConfiguratorComponent;
  let fixture: ComponentFixture<ProfileConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileConfiguratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
