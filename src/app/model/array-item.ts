export interface ArrayDataItem {
    id: string;
    int: number;
    float: number;
    color: string;
    child: ItemChild;
}

export interface ItemChild {
    id: string;
    color: string;
}

export class DataItem {
    public id!: string;
    public int!: number;
    public float!: number;
    public color!: string;
    public child!: ItemChild;
}
