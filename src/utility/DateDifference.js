const DateDifference = (date1, date2) => {

    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

    console.log(Difference_In_Days);

    return Difference_In_Days;
}

export default DateDifference;