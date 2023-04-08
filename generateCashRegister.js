const fs = require('fs');

var data = []
var startDate = "2020-01-01"
startDate = new Date(startDate)
function main() {
    for (let index = 0; index < 365; index++) {
        let currentDate = startDate.setDate(startDate.getDate() + 1)
        let dateObj = new Date(currentDate) 
        let localResult = {
            "date": dateObj.toISOString().substring(0, 10),
            "sales": {
                "hotDish": {
                    "fried-rice": generateRandomNumber(20, 100),
                    "fried-noodle": generateRandomNumber(20, 100),
                    "fashew-Chicken": generateRandomNumber(20, 100),
                    "shrimp-lo-mein": generateRandomNumber(20, 100),
                    "sweet-Sour-Chicken": generateRandomNumber(20, 100)
                },
                "appetizer": {
                    "spring-roll": generateRandomNumber(20, 100),
                    "crab-rangoon": generateRandomNumber(20, 100),
                    "fried-shrimp":generateRandomNumber(20, 100)
                }
            }
        }
        data.push(localResult)
    }
    var jsonObj = {"data": data}
    var jsonString = JSON.stringify(jsonObj)
    fs.writeFile('./resources/cashRegister.json', jsonString, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    
}
function generateRandomNumber(start, end) {
    return Math.floor((Math.random() * end) + start)
}

main()