import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SocketFactoryService {

    constructor() { }

    createSocket(timer: number, arraySize: number, idList: string[]) {
        console.log('SOCKET CREATED');
    }
}
