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
