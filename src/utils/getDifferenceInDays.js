export const getDifferenceInDays = (dateStr1, dateStr2) => {
   const date1 = parseDate(dateStr1);
   const date2 = parseDate(dateStr2);
   
   const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
   const diffInMilliseconds = Math.abs(date2 - date1);
   
   return Math.round(diffInMilliseconds / oneDay) + 1;
};

const parseDate = (dateStr) => {
   const [day, month, year] = dateStr.split('-').map(Number);
   return new Date(year, month - 1, day); // Note: month is zero-based
};
