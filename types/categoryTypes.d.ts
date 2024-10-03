export type TCategoryPayload = {
    name: string;
    categoryImage?: File | string;
};

export type TCategory = {
    _id: string;
    name: string;
    categoryImage?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};


export type TCategoryAPIResponse = {
    data: Array<TCategory>;
}