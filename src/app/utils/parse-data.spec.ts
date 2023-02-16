import { DataItem } from "../model/array-item";
import { DataGenerator } from "./data-generator";
import { parseData } from "./parse-data";

describe('ParseData', () => {
    it('should return DataItem array', () => {
        const parsedData = parseData(JSON.stringify(DataGenerator.generateDataArray(4)));
        const allOfTypeDataItem = parsedData.map(entry => entry instanceof DataItem).reduce((acc, cur) => acc && cur, true);
        expect(allOfTypeDataItem).toEqual(true);
    });

    it('should return all the elements if generated no more than 10', () => {
        let returnedTheSameNumberOfElements = true;
        for (let i = 1; i <= 10; ++i) {
            const parsedData = parseData(JSON.stringify(DataGenerator.generateDataArray(i)));
            returnedTheSameNumberOfElements &&= parsedData.length === i;
        }
        expect(returnedTheSameNumberOfElements).toEqual(true);
    });

    it('should return 10 elements if generated more than 10', () => {
        let returned10Elements = true;
        for (let i = 10; i <= 30; i += 10) {
            const parsedData = parseData(JSON.stringify(DataGenerator.generateDataArray(i)));
            returned10Elements &&= parsedData.length === 10;
        }
        expect(returned10Elements).toEqual(true);
    });
});
