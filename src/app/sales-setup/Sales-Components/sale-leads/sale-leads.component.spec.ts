import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleLeadsComponent } from './sale-leads.component';

describe('SaleLeadsComponent', () => {
  let component: SaleLeadsComponent;
  let fixture: ComponentFixture<SaleLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleLeadsComponent]
    });
    fixture = TestBed.createComponent(SaleLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
