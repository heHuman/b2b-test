import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataItem } from '../model/array-item';

@Injectable({
    providedIn: 'root'
})
export class WorkerMessagingService {
    private messagesFromWorkerSubject = new Subject<DataItem[]>();
    readonly messagesFromWorker = this.messagesFromWorkerSubject.asObservable();

    constructor() { }

    subscribeToWorker(worker: Worker): void {
        worker.onmessage = (ev) => {
            this.messagesFromWorkerSubject.next(ev.data)
        }
    }

    sendMessageToWorker(worker: Worker, message: any): void {
        worker.postMessage(message);
    }
}
