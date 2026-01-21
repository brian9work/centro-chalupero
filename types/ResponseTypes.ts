export type ExtrasType = {
    name: string,
    price: number
}

export type SaucerType = {
    id: string;
    name: string;
    description?: string | "";
    price: number;
    extra?: boolean;
}

export type CategoryType = {
    id: string;
    name: string;
    source: string;
    saucerList: SaucerType[];
}

export type MenuType = {
    data: CategoryType[];
}