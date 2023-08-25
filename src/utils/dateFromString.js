export const dateFormat = dateString => {
   if (dateString) {
      const parts = dateString.split("-");

      const year = parseInt(parts[2]);
      const month = parseInt(parts[1]);
      const day = parseInt(parts[0]);

      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      return formattedDate;
   }
   return null;
};