import { TCategory } from "./categoryTypes";

export type DerivedQuestion = {
    option: string;
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<Record<string, unknown>>;
    _id?: string;
};

export type Question = {
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<DerivedQuestion>;
};

export type TSubCategoryPayload = {
    categoryId: string;
    name: string;
    subCategoryImage?: File | null;
    questionArray?: Array<Question>;
};

export type AddSubCategoryResponse = TSubCategoryPayload & {
    _id: string;
    owner: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type GetAllSubcategoryParams = {
    categoryId?: string;
};

export type TSubCategory = {
    _id: string;
    categoryId: TCategory;
    name: string;
    subCategoryImage: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
};

export type TSubCategoryResponse = {
    data: Array<TSubCategory>,
};