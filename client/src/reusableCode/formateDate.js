const handaleLongDate = (longDate) => { //המרה לתאריך לועזי בפורמט קריא

    const dateString = longDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate;

}

const convertDateToHebrew = (date) => { //המרה לתאריך עברי

    const dateString = date;
    const newdate = new Date(dateString);

    const partialDateConversion = new Intl.DateTimeFormat('he-u-ca-hebrew', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }).format(newdate); //המרת תאריך לועזי לעברי בלי שנה ויום בחודש
    const dateArr = partialDateConversion.split(" ") //פיצול התאריך למערך

    //המרת שנה לעברית

    let loaziYear = dateArr[4]; //שנה עברית במספרים

    const hebrewLetters = {
        0: '',
        1: 'א',
        2: 'ב',
        3: 'ג',
        4: 'ד',
        5: 'ה',
        6: 'ו',
        7: 'ז',
        8: 'ח',
        9: 'ט',
        10: 'י',
        20: 'כ',
        30: 'ל',
        40: 'מ',
        50: 'נ',
        60: 'ס',
        70: 'ע',
        80: 'פ',
        90: 'צ',
        100: 'ק',
        200: 'ר',
        300: 'ש',
        400: 'ת',
    };

    const digits = [...loaziYear.toString()];
    const individualDigits = digits.map(digit => Number(digit));
   //individualDigits Output: [5, 7, 8, 2]

    var thousands = Math.floor(individualDigits[0]); // אלפים
    var hundreds = Math.floor((individualDigits[1] * 100)); // מאות
    var tens = Math.floor((individualDigits[2] * 10)); // עשרות
    var units = individualDigits[3]; // אחדות

    if (hundreds > 400) {
        var firstDigit = 400
        var secondDigit = hundreds - 400
    }

    var hebrewYearString = hebrewLetters[thousands] +
        (hebrewLetters[hundreds] !== undefined ? hebrewLetters[hundreds] : hebrewLetters[firstDigit]) + hebrewLetters[secondDigit] +
        hebrewLetters[tens] +
        hebrewLetters[units];

        //hebrewYearString שנה מומרת לעברית


    //המרת יום לעברי
    let loaziDay = dateArr[2];
    const digitsDay = [...loaziDay.toString()];
    const digitsNum = digitsDay.map(digit => Number(digit));
    //digitsNum Output: [2,2]

    let tensDay = Math.floor((digitsNum[0] * 10)); // עשרות
    let unitsDay = digitsNum[digitsNum.length - 1]; // אחדות
    let hebrewDayString = digitsNum.length > 1 ? hebrewLetters[tensDay] : "" + hebrewLetters[unitsDay];
    //hebrewDayString יום מומר לעברית


    dateArr[4] = hebrewYearString;
    dateArr[2] = hebrewDayString;
    const mergeDate = dateArr.join(" ");

    return mergeDate;

}


module.exports = { convertDateToHebrew, handaleLongDate };
