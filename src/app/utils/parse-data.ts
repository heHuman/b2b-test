import { plainToInstance } from "class-transformer";
import { DataItem, ArrayDataItem } from "../model/array-item";

export function parseData(data: string): DataItem[] {
    const dataArray: ArrayDataItem[] = JSON.parse(data);
    const lastTenElements = dataArray.length <= 10 ? dataArray : dataArray.slice(-10);
    return plainToInstance(DataItem, lastTenElements);
}
