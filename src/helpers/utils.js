export function stringToDate(string) {
    const numToMonth = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    const date = new Date(string.substr(0, 2) + "/" + string.substr(2, 2) + "/" + string.substr(4, 4))
    return {
        "Month": date.getMonth(),
        "Day": date.getDay(),
        "Year": date.getFullYear(),
        "MonthName": numToMonth[date.getMonth()],
        "DateObj": date
    }
}

export function getDifInDate(date) {
    // expect date to be a Date object
    let now = new Date()

    let diff = Math.abs(Math.floor(date.getTime() - now.getTime()));
    let secs = Math.floor(diff/1000);
    let mins = Math.floor(secs/60);
    let hours = Math.floor(mins/60);
    let days = Math.floor(hours/24);
    let weeks = Math.floor(days/7);
    let months = Math.floor(days/31);
    let years = Math.floor(months/12);
    
    console.log(secs, mins, hours, days, months, years)
    let message = ""

    if (years > 0) {
        message = years + "yr"
    } else if (months > 0) {
        message = months + "m"
    } else if (weeks > 0) {
        message = weeks + "wk"
    } else if (days > 0) {
        message = days + "d"
    } else if (hours > 0) {
        message = pluralize(hours, "hr")
    } else if (mins > 0) {
        message = pluralize(mins, "min")
    } else if (secs > 0) {
        message = pluralize(secs, "sec")
    }
    return message
}

function pluralize(num, suffix) {
    return num + (num != 1) ? suffix + "s" : suffix
}