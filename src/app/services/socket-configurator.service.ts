import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { WorkerFactoryService } from './worker-factory.service';
import { WorkerMessagingService } from './worker-messaging.service';

@Injectable({
    providedIn: 'root'
})
export class SocketConfiguratorService implements OnDestroy {
    private timerSubject = new Subject<number>();
    private arraySizeSubject = new Subject<number>();
    private idListSubject = new BehaviorSubject<string[]>([]);

    private destroyed$ = new Subject<void>();

    readonly timerObservable = this.timerSubject.asObservable();
    readonly arraySizeObservable = this.arraySizeSubject.asObservable();

    constructor(
        private workerFactory: WorkerFactoryService,
        private workerMessaging: WorkerMessagingService
    ) {
        combineLatest([this.timerObservable, this.arraySizeObservable, this.idListSubject])
        .pipe(takeUntil(this.destroyed$))
        .subscribe(([interval, arraySize, idList]) => {
            const worker = this.workerFactory.createWorker();
            this.workerMessaging.subscribeToWorker(worker);
            this.workerMessaging.sendMessageToWorker(worker, { interval, arraySize, idList });
        })
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    setTimerValue(timerInterval: number): void {
        this.timerSubject.next(timerInterval);
    }

    setArraySize(arraySize: number): void {
        this.arraySizeSubject.next(arraySize);
    }

    setIdList(idList: string[]): void {
        this.idListSubject.next(idList);
    }

    getIdList(): string[] {
        return this.idListSubject.getValue();
    }
}
