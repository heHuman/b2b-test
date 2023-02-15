import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketConfiguratorService {
    private timerSubject = new Subject<number>();
    private arraySizeSubject = new Subject<number>();
    private idListSubject = new BehaviorSubject<string[]>([]);

    readonly timerObservable = this.timerSubject.asObservable();
    readonly arraySizeObservable = this.arraySizeSubject.asObservable();

    constructor() { }

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
