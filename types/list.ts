export interface ListInterface {
    id: number;
    name: string;
}

export interface ItemListInterface {
        id: number;
        name: string;
        price?: number;
        quantity?: number;
        is_checked: boolean;
}