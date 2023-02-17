/// <reference lib="webworker" />

import { DataItem } from '../model/array-item';
import { parseData } from '../utils/parse-data';
import { PseudoSocket } from '../utils/pseudo-socket';

let socketInstance: PseudoSocket;

function sendDataToMainThread(data: DataItem[]): void {
    postMessage(data);
}

addEventListener('message', ({ data }) => {
    if (socketInstance) {
        socketInstance.close()
    }
    socketInstance = new PseudoSocket(data.interval, data.arraySize, data.idList);
    socketInstance.addEventListener('message', (encodedData: string) => {
        sendDataToMainThread(parseData(encodedData));
    });
    socketInstance.open();
});
