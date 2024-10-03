import { UserData } from "./authTypes";
import { TCategory, TCategoryAPIResponse, TCategoryData } from "./categoryTypes";

export type DefaultSettings = {
    'data-layout-mode': string;
    'data-bs-theme': string;
    'data-menu-color': string;
    'data-topbar-color': string;
    'data-layout-position': string;
    'data-sidenav-size': string;
    'data-sidenav-user': string;
};

export type MenuItems = {
    title?: string;
    label?: string;
    to?: string;
    icon?: string;
    isSubmenu?: boolean;
    items?: Array<MenuItems>;
};

export type DerivedQuestion = {
    option: string;
    question: string;
    options: { [key: string]: string };
    derivedQuestions: Array<DerivedQuestion>;
};

export type Question = {
    question: string;
    options: { [key: string]: string };
    derivedQuestions: Array<DerivedQuestion>;
};

export type SubCategory = {
    categoryId: string;
    name: string;
    image: File | null;
    questionArray: Array<Question>;
};

export type Category = {
    id: string;
    name: string;
};

export type DataState = {
    authData?: Partial<UserData>,
    categoryData?: Partial<TCategoryAPIResponse>,
    singleCategoryData?: Partial<TCategory>,
    error: string | null,
    type: string,
};

export type SagaGenerator<Y, R = void> = Generator<CallEffect<Y> | PutEffect | SelectEffect | TakeEffect, R, Y>;

export type CommonResponse = {
    statusCode: number,
    message: string,
    success: boolean,
};

export type ApiResponse<T> = CommonResponse & {
    data?: T;
};