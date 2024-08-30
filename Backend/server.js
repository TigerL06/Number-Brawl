const express = require('express')
const app = express()


app.set('view engine', 'ejs')
app.get("/", (rep, res) =>{
    console.log("Here")
    res.json({})
    res.download()
    res.render()
})

const router = require('./routes/users')
app.use('/users', router)

app.listen(3000)

