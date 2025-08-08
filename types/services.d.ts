export type ShiftTime = {
    startTime: string;
    endTime: string;
    _id: string;
};

export type Shift = {
    _id: string;
    shiftName: string;
    shiftTimes: Array<ShiftTime>;
};

export type ShiftSelection = {
    shiftId: string;
    shiftTimeId: string;
};

export type ServiceProvider = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
};

export type AssignedAgent = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
};

export type Answer = {
    answer: string;
    selectedOption: string;
    derivedAnswers: Array<DerivedAnswer>;
    _id: string;
};

export type DerivedAnswer = {
    derivedAnswers: Array<DerivedAnswer>; // Recursive structure for derived answers
    option: string;
    answer: string;
    _id: string;
};

export type OtherInfo = {
    productSerialNumber: string;
    serviceDescription: string;
    _id: string;
};

export type Location = {
    type: string;
    coordinates: [number, number];
};

export type BookedTimeSlot = {
    endTime: string
    startTime: string
    _id: string
}

export type ServiceRequest = {
    _id: string;
    categoryId: {
        _id: string;
        name: string;
        categoryImage: string;
    };
    serviceStartDate: string;
    serviceShifftId: Shift; // Updated to match the shift structure
    SelectedShiftTime: ShiftSelection;
    serviceZipCode: number;
    serviceLatitude: number;
    serviceLongitude: number;
    isIncentiveGiven: boolean;
    incentiveAmount: number;
    isTipGiven: boolean;
    tipAmount: number;
    isApproved: string;
    isReqAcceptedByServiceProvider: boolean;
    serviceProviderId: ServiceProvider | null; // Updated to match the service provider structure
    assignedAgentId: AssignedAgent | null; // Updated to match the assigned agent structure
    answerArray: Array<Answer>;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        avatar: string;
    };
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    requestProgress: string;
    otherInfo?: OtherInfo; // Optional as it's missing in some entries
    location?: Location; // Optional as it's missing in some entries
    serviceProductImage: string;
    startedAt: string | null;
    completedAt: string | null;
    subCategoryId?: string; // Optional as it's missing in some entries
    customerName?: string;
    customerEmail?: string;
    serviceProviderName?: string
    serviceProviderPhone?: string
    customerPhone?: string
    categoryName?: string
    customerAvatar?: string
    bookedServiceShift?: string
    serviceDescription?: string
    bookedTimeSlot?: Array<BookedTimeSlot>
    bookedServiceShift?: string
    serviceProductSerialNumber?: string
    serviceProviderEmail?: string
    assignedAgentEmail?: string
    assignedAgentName?: string
    assignedAgentPhone?: string
    isReqAcceptedByServiceProvider?: boolean
    totalCustomerRatings?: string
    serviceStartReadableFormat?: string
    serviceEndReadableFormat?: string
};