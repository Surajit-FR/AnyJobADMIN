import { UserData } from "./authTypes";
import { TCategory, TCategoryAPIResponse, TCategoryData } from "./categoryTypes";
import { TQuestion } from "./questionTypes";
import { TSubCategory } from "./subCategoryTypes";

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

export type DataState = {
    authData?: Partial<UserData>,
    categoryData?: Array<TCategory>,
    singleCategoryData?: Partial<TCategory>,
    subCategoryData?: Array<TSubCategory>,
    singleSubCategoryData?: Partial<TSubCategory>,
    questionData?: Array<TQuestion>,
    singleQuestionData?: Array<TQuestion>,
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