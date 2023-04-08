const e = require('express');
const express = require('express')
const app = express()
const port = 3000
const cashRegister = require("./resources/cashRegister.json")

app.get("/allRegisterHistory", function(req, res) {
    res.json(cashRegister)
});

app.get("/registerHistoryPeriod/:startDate/:endDate", function(req, res) {
    let startDate = Date.parse(req.params.startDate.toString())
    let endDate = Date.parse(req.params.endDate.toString())
    let result = cashRegister.data.filter(e => Date.parse(e.date)>= startDate && Date.parse(e.date)<= endDate)
    res.json(result)
})

app.get("/registerHistoryPeriodDishAmount/:startDate/:endDate", function(req, res) {
    let startDate = Date.parse(req.params.startDate.toString())
    let endDate = Date.parse(req.params.endDate.toString())
    let chosenPeriod = cashRegister.data.filter(e => Date.parse(e.date)>= startDate && Date.parse(e.date)<= endDate)
    let hotDish = {}
    let appetizer = {}
    chosenPeriod.forEach(function(e) {
        Object.entries(e.sales.hotDish).forEach(element => {
            hotDish[element[0]] = hotDish[element[0]] ? hotDish[element[0]] + element[1] : element[1]
        });      
        Object.entries(e.sales.appetizer).forEach(element => {
            appetizer[element[0]] = appetizer[element[0]] ? appetizer[element[0]] + element[1] : element[1]
        });      
    })
    const result = {"hotdish": hotDish, "appetizer": appetizer}
    res.json(result)
})

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => console.log(`Application listening on port ${process.env.PORT}!`))
