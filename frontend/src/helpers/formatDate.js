export const formatDate = (date) => {

    let formattedDate = new Date(date),
     month = "" + (formattedDate.getMonth() + 1),
     day = "" + formattedDate.getDate(),
     year = formattedDate.getFullYear();

     if (month.length < 2) month = "0" + month;
     if (day.length < 2) day = "0" + day;
 
     formattedDate = [year, month, day].join("-");
     return formattedDate;

}