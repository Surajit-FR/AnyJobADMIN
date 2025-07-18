export const getTimeDiff = (date1: Date, date2: Date)=>{
const time1 = new Date(date1);
const time2 = new Date(date2);

const diffInMilliseconds = Math.abs(time2.getTime() - time1.getTime());

const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
const diffInMinutes = (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60); // Remaining minutes

return `${Math.floor(diffInHours)} hours and ${Math.round(diffInMinutes)} minutes`// Output: Time difference: 5 hours and 30 minutes
 
}