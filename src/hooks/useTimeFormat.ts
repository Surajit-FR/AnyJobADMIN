import { useCallback } from "react";

// Custom hook for converting 24-hour format to 12-hour format
export const useTimeFormat = () => {
    const convertTo12HourFormat = useCallback((time: string): string => {
        const [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
        return `${formattedHour}:${minute < 10 ? `0${minute}` : minute} ${ampm}`;
    }, []);

    return { convertTo12HourFormat };
};