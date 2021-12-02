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
    if (typeof string == "string") {
        const date = new Date(`${string.substr(0, 2)}/${string.substr(2, 2)}/${string.substr(4, 4)} 23:59`)
        //const date = new Date(string.substr(0, 2) + "/" + string.substr(2, 2) + "/" + string.substr(4, 4))
        return {
            "Month": date.getMonth(),
            "Day": date.getDay(),
            "Year": date.getFullYear(),
            "MonthName": numToMonth[date.getMonth()],
            "DateObj": date
        }
    } else {
        console.log("Failure to convert string to date object")
        console.log(string)
    }

}

export function getDifInDate(date) {
    // expect date to be a Date object
    let now = new Date()

    if (date.getTime() - now.getTime() < 0) {
    	return "Past"
    }

    let diff = Math.floor(date.getTime() - now.getTime());
    let secs = diff/1000;
    let mins = secs/60;
    let hours = mins/60;
    let days = hours/24;
    let weeks = days/7;
    let months = days/31;
    let years = months/12;
    secs = Math.round(secs), 
    mins = Math.round(mins), 
    hours = Math.round(hours), 
    days = Math.round(days), 
    weeks = Math.round(weeks), 
    months = Math.round(months), 
    years = Math.round(years - 0.2);

    
    //console.log(secs, mins, hours, days, months, years)
    let message = ""

    if (years > 0) {
        message = years + "yr"
    } else if (months > 0) {
        message = months + "mox "
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
    return num.toString() + ((num != 1) ? suffix + "s" : suffix)
}

export function abbreviateNum(num) {
    const conversion = ["K", "M", "B"]
    for (let i = 3; i > 0; i--) {
        if (Math.floor(num / Math.pow(10, 3 * i)) > 0) {
            let shortened = num / Math.pow(10, 3 * i)
            // rounds to the nearest tenth decimal place (at most)
            return (Math.round(shortened * 10) / 10).toString() + conversion[i-1] 
        }
    }
    return num

}