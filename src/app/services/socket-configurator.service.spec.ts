import { TestBed } from '@angular/core/testing';

import { SocketConfiguratorService } from './socket-configurator.service';

import { WorkerFactoryService } from './worker-factory.service';

describe('SocketConfiguratorService', () => {
    let service: SocketConfiguratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: WorkerFactoryService, useValue: jasmine.createSpyObj(WorkerFactoryService, ['createWorker']) }
            ]
        });
        service = TestBed.inject(SocketConfiguratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
