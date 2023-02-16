import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WorkerStoreService {
    private _instance!: Worker;
    public get instance(): Worker {
        return this._instance;
    }
    public set instance(value: Worker) {
        this._instance = value;
    }

    constructor() { }

    hasInstance() {
        return this.instance !== undefined;
    }
}
