import { DataGenerator } from "../utils/data-generator";
import { ArrayDataItem } from "./array-item";

export type Listener = (param: {data: ArrayDataItem[]}) => void;

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
            this.eventListeners[eventName](param);
        }
    }
}
