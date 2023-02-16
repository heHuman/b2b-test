import { Injectable } from '@angular/core';
import { WorkerStoreService } from './worker-store.service';

@Injectable({
    providedIn: 'root'
})
export class WorkerFactoryService {

    constructor(private workerStore: WorkerStoreService) { }

    createWorker(timer: number, arraySize: number, idList: string[]): Worker {
        if (this.workerStore.hasInstance()) {
            this.workerStore.instance;
        }

        const worker = new Worker(new URL('../workers/data-receiver.worker', import.meta.url), { type: 'module' });

        this.workerStore.instance = worker;
        return worker;
    }
}
