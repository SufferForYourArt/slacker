var bodyParser = require('body-parser')
var cors = require('cors')
var express = require('express')

var app = express()

app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.send("Server active!")
})

app.post('/pushbutton', cors(), (request, response) => {
    console.log('button pushed:', request.body.value)
    response.send(`button pushed: ${request.body.value}`)
})

app.listen(3000, () => {
    console.log("Server listening on port 3000!")
})