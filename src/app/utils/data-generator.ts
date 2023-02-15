import { ArrayDataItem } from "../model/array-item";

function generateRandomColor(): string {
    return Math.floor(Math.random()*16777215).toString(16);
}

export class DataGenerator {

    public static generateDataArray(arraySize: number, specificIds?: string[]): ArrayDataItem[] {
        const resArray: ArrayDataItem[] = Array(arraySize).fill(DataGenerator.generateDataItem());

        if (specificIds) {
            for (let i = 0; i < specificIds.length; ++i) {
                resArray[resArray.length - 10 + i].id = specificIds[i];
            }
        }

        return resArray;
    }

    public static generateDataItem(): ArrayDataItem {
        return {
            id: '1',
            int: 31253295,
            float: 12.123215121515,
            color: generateRandomColor(),
            child: {
                id: 'child-id',
                color: generateRandomColor()
            }
        };
    }
}
