import { TestBed } from '@angular/core/testing';

import { BookBookshopService } from './book-bookshop.service';

describe('BookBookshopService', () => {
  let service: BookBookshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookBookshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
