export type TCategoryPayload = {
    name: string;
    categoryImage?: File | string;
    serviceCost: number;
};

export type TCategory = {
    _id: string;
    name: string;
    categoryImage?: string;
    owner: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    serviceCost: number;
};


export type TCategoryAPIResponse = {
    data: Array<TCategory>;
}