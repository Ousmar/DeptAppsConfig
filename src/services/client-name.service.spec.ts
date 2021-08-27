import { TestBed } from '@angular/core/testing';

import { ClientNameService } from './client-name.service';

describe('ClientNameService', () => {
  let service: ClientNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
