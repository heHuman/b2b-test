import { TestBed } from '@angular/core/testing';

import { SocketConfiguratorService } from './socket-configurator.service';

describe('SocketConfiguratorService', () => {
  let service: SocketConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketConfiguratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
