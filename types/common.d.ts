import { User, UserData } from "./authTypes";
import { TCategory, TCategoryAPIResponse, TCategoryData } from "./categoryTypes";
import { QuestionRespone, TQuestion } from "./questionTypes";
import { ServiceRequest } from "./services";
import { TShift } from "./shiftTypes";
import { IPData } from './ipstate'

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
export type AllCustomers = {
    name: string,
    phone: string,
    email: string,
    avgRating: string,
    status: number
}
export type ExportingCustomer = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    createdAt: Date,
    avgRating: string,
}
export type TransactionsData = {
    _id: string,
    type: string,
    currency: string,
    amount: number,
    description: string,
    stripeTransactionId: string,
    createdAt: Date,
    updatedAt: Date,
    serviceProviderName: string,
    customerName: string,
    categoryName: string,
    categoryCost: string,
    spCompanyName: string,
}
export type BalanceCardData = {
    avilable: number,
    pending: number
}
export type DashboardCardData = {
    totalCustomer: number,
    totalServiceProvider: number,
    totalGeneratedService: number,
    balance: BalanceCardData,
}
export type UserRatingsData = {
    rating: number | null,
    comments: string,
    createdAt: string,
    ratedBy_firstName: string,
    ratedBy_lastName: string,
    ratedBy_avatar: string,
    ratedBy_userType: string,
    ratedTo_firstName: string,
    ratedTo_lastName: string,
    ratedTo_avatar: string,
    ratedTo_userType: string,
}
export type DataState = {
    authData?: Partial<UserData>,
    categoryData?: Array<TCategory>,
    singleCategoryData?: Partial<TCategory>,
    questionData?: Array<QuestionRespone>,
    singleQuestionData?: Partial<QuestionRespone>,
    shiftData?: Array<TShift>,
    singleShiftData?: Partial<TShift>,
    userData?: Partial<User>,
    singleServiceData?: Partial<ServiceRequest>,
    error: string | null,
    type: string,
    allServiceData?: Array<ServiceRequest>
    allServiceProviderData?: Array<ServiceRequest>
    allCustomerData?: Array<AllCustomers>
    ipData?: IPData,
    userIpInfo?: IPData,
    serviceRequestTableData?: Array<ServiceRequest>
    serviceTableTotalElems?: number
    transactionData?: Array<TransactionsData>
    dashboardCardData?: DashboardCardData
    allRatingsData?: Array<UserRatingsData>
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