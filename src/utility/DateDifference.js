const DateDifference = (Date1, Date2) => {

    var date1 = new Date(Date1);
    var date2 = new Date(Date2);
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
}

export default DateDifference;