import { User } from "./authTypes";

export type UserAddress = {
    _id: string;
    userId: string;
    zipCode: number;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
    location?: string
};

export type AdditionalInfo = {
    _id: string;
    userId: string;
    companyName: string;
    companyIntroduction: string;
    DOB: string;
    driverLicense: string;
    driverLicenseImages: Array<string>;
    EIN: string;
    socialSecurity: string;
    companyLicense: string;
    companyLicenseImage: string;
    insurancePolicy: number;
    licenseProofImage: string;
    businessLicenseImage: string;
    businessImage: string;
    businessName: string;
    isReadAggrement: boolean;
    isAnyArrivalFee: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TUserDetailsAPIResponse = {
    data: Array<User>;
}