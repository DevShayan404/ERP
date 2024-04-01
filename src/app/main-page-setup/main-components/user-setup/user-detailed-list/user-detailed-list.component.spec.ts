import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailedListComponent } from './user-detailed-list.component';

describe('UserDetailedListComponent', () => {
  let component: UserDetailedListComponent;
  let fixture: ComponentFixture<UserDetailedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailedListComponent]
    });
    fixture = TestBed.createComponent(UserDetailedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
