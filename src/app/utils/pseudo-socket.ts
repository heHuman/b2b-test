import { DataGenerator } from "./data-generator";
import { ArrayDataItem } from "../model/array-item";

export type Listener = (data: string) => void;

export class PseudoSocket {
    private eventListeners: {[key: string]: Listener} = {};

    // TODO: need to clean it up somehow
    private intervalId!: number;

    constructor(intervalMs: number, arraySize: number, idList?: string[]) {
        this.intervalId = setInterval(() => {
            this.fireEvent('message', { data: DataGenerator.generateDataArray(arraySize, idList) });
        }, intervalMs) as unknown as number;
    }

    addEventListener(eventName: string, listener: Listener): void {
        this.eventListeners[eventName] = listener;
    }

    close() {
        clearInterval(this.intervalId);
    }

    private fireEvent(eventName: string, param: {data: ArrayDataItem[]}): void {
        if (this.eventListeners[eventName]) {
            // stringify to emulate simplest format of actual data
            this.eventListeners[eventName](JSON.stringify(param.data));
        }
    }
}
