const express = require('express')
const app = express()
let number

Randomnumber()
app.set('view engine', 'ejs')
app.Post("/", (rep, res) =>{
    
    console.log(number)
})
app.listen(3000)

function Randomnumber(){
    number = Math.floor(Math.random() * 101);;
    console.log(number)
}