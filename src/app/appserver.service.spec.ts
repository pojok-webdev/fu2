import { TestBed } from '@angular/core/testing';

import { AppserverService } from './appserver.service';

describe('AppserverService', () => {
  let service: AppserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
