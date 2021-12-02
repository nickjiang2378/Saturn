import { stringToDate } from "./utils";

export function filter(grants, searchRequest) {
    let filteredGrants = [];
    for (const grant of grants) {
        let include = true;
        if (searchRequest["category"] && searchRequest["category"] != grant["CategoryOfFundingActivity"]) {
            include = false;
        } 
        if (include && searchRequest["keywords"]) {
            let keywords = searchRequest["keywords"].trim().toLowerCase()
            let description = grant["Description"].trim().toLowerCase()
            if (!description.includes(keywords)) {
                include = false;
            }
        } 
        if (include && searchRequest["minGrantTarget"] || searchRequest["maxGrantTarget"]) {
            let min = (searchRequest["minGrantTarget"] && parseInt(searchRequest["minGrantTarget"])) || 0
            let max = (searchRequest["maxGrantTarget"] && parseInt(searchRequest["maxGrantTarget"])) || Infinity
            let grantMin = (grant["AwardFloor"]) ? parseInt(grant["AwardFloor"]) : 0
            let grantMax = (grant["AwardCeiling"]) ? parseInt(grant["AwardCeiling"]) : Infinity
            //console.log(min, max, grantMin, grantMax)
            if (!(min <= grantMax && grantMin <= max) || (grantMin == 0 && grantMax == 0)) {
                include = false;
                //console.log("Include = false now")
            }

        }
        const currentDate = new Date();
        if (include && searchRequest["removePast"] && stringToDate(grant["CloseDate"]).DateObj - currentDate < 0) {
            include = false;
        }
        if (include) {
            filteredGrants.push(grant)
        }
    }
    if (searchRequest["sortBy"]) {
        filteredGrants.sort((a, b) => {
            let compareA = a[searchRequest["sortBy"]], compareB = b[searchRequest["sortBy"]];
            
            if (searchRequest["sortBy"] == "CloseDate") {
                //console.log(compareA)
                compareA = stringToDate(compareA).DateObj
                compareB = stringToDate(compareB).DateObj
                //console.log(`${compareA - compareB}: ${compareA}, ${compareB}`)

            } else if (searchRequest["sortBy"] == "PostDate") {
                //console.log(compareA)
                
                compareA = stringToDate(compareA).DateObj
                compareB = stringToDate(compareB).DateObj
                let tmp = compareA
                compareA = compareB
                compareB = tmp
                //[compareA, compareB] = [compareB, compareA]; // Array destructuring results in bug
            }
            return compareA - compareB
        })
    }
    return filteredGrants
}