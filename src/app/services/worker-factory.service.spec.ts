import { TestBed } from '@angular/core/testing';

import { WorkerFactoryService } from './worker-factory.service';
import { WorkerStoreService } from './worker-store.service';

let workerInstanceValue = { name: 'MyWorker' };

class StoreMock {
    public get instance() {
        return workerInstanceValue;
    };

    public hasInstance() {
        return this.instance;
    }
}

fdescribe('WorkerFactoryService', () => {
    let factoryService: WorkerFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WorkerFactoryService,
                { provide: WorkerStoreService, useClass: StoreMock }
            ]
        });
        TestBed.inject(WorkerStoreService);
        factoryService = TestBed.inject(WorkerFactoryService);
    });

    describe('createWorker with stored instance', () => {
        it('should return instance from the store', () => {
            expect(factoryService.createWorker()).toEqual(jasmine.objectContaining({
                name: 'MyWorker'
            }));
        });
    });
});
