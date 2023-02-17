import { ArrayDataItem } from "../model/array-item";

function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export class DataGenerator {
    public static generateDataArray(arraySize: number, specificIds?: string[]): ArrayDataItem[] {
        const resArray: ArrayDataItem[] = Array(arraySize).fill(DataGenerator.generateDataItem());

        const minDisplayedIndex = arraySize <= 10 ? 0 : arraySize - 10;
        for (let i = 0; minDisplayedIndex + i < arraySize; ++i) {
            resArray[minDisplayedIndex + i] = this.generateDataItem();
            if (specificIds && specificIds.length > i) {
                resArray[minDisplayedIndex + i].id = specificIds[i];
            }
        }

        return resArray;
    }

    private static generateDataItem(): ArrayDataItem {
        return {
            id: Math.floor(Math.random() * 1000000).toString(),
            int: Math.floor(Math.random() * 1000000),
            float: +(Math.random() * 35).toFixed(18),
            color: generateRandomColor(),
            child: {
                id: 'child-id',
                color: generateRandomColor()
            }
        };
    }
}
