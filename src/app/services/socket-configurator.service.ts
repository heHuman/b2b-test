import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { SocketFactoryService } from './socket-factory.service';

@Injectable({
    providedIn: 'root'
})
export class SocketConfiguratorService {
    private timerSubject = new Subject<number>();
    private arraySizeSubject = new Subject<number>();
    private idListSubject = new BehaviorSubject<string[]>([]);

    readonly timerObservable = this.timerSubject.asObservable();
    readonly arraySizeObservable = this.arraySizeSubject.asObservable();

    constructor(private socketFactory: SocketFactoryService) {
        combineLatest([this.timerObservable, this.arraySizeObservable])
        .subscribe(([timer, arraySize]) => {
            this.socketFactory.createSocket(timer, arraySize, this.idListSubject.getValue());
        })
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
