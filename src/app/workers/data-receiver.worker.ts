/// <reference lib="webworker" />

import { ArrayDataItem } from '../model/array-item';
import { PseudoSocket } from '../utils/pseudo-socket';

let socketInstance: PseudoSocket;

function parseData(data: string) {
    const dataArray: ArrayDataItem[] = JSON.parse(data);
    const lastTenElements = dataArray.length <= 10 ? dataArray : dataArray.slice(-10);
    postMessage({ lastTenElements });
}

addEventListener('message', ({ data }) => {
    if (socketInstance) {
        socketInstance.close();
    }
    socketInstance = new PseudoSocket(data.interval, data.arraySize);
    socketInstance.addEventListener('message', parseData);
});
