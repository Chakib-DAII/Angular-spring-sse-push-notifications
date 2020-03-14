import { TestBed } from '@angular/core/testing';

import { PushServiceService } from './push-service.service';

describe('PushServiceService', () => {
  let service: PushServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
