export type TShiftTime = {
    startTime: string;
    endTime: string;
    _id?: string;
};

export type TShiftPayload = {
    shiftName: string;
    shiftTimes: Array<TShiftTime>;
};

export type TShift = TShiftPayload & {
    _id: string;
    isDeleted:boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
};

export type TShiftAPIResponse = {
    data: Array<TShift>;
}