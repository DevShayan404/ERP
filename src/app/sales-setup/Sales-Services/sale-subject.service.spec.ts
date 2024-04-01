import { TestBed } from '@angular/core/testing';

import { SaleSubjectService } from './sale-subject.service';

describe('SaleSubjectService', () => {
  let service: SaleSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
