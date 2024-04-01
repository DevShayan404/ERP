import { TestBed } from '@angular/core/testing';

import { SaleLeadService } from './sale-lead.service';

describe('SaleLeadService', () => {
  let service: SaleLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
