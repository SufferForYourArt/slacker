const ACCESS_TOKEN = 'xoxp-45409264581-63227063794-137134327652-8f78dc483a8905cdffbe170e43d3a0e4';
const peeps = ['@kurtlogan', '@chrissysemens', '@shaun'];

var bodyParser = require('body-parser')
var cors = require('cors')
var express = require('express')
var http = require('http');
var request = require('request');

var app = express()

app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.send("Server active!")
})

app.post('/pushbutton', cors(), (req, response) => {
    console.log('button pushed:', req.body.value)
    
    const peep = peeps[Math.floor((Math.random() * peeps.length) + 1)];

    request('http://api.adviceslip.com/advice', function(error, response, body) {
        if (error) {
            //error handling here
        }

        var quoteResponse = JSON.parse(response.body);
        var quoteText = peep + ', ' + quoteResponse.slip.advice;

        const options = {
            method: 'POST',
            uri: 'https://slack.com/api/chat.postMessage',
            form: {
                token: ACCESS_TOKEN,
                channel: 'test',
                text: quoteText,
                as_user: false
            },
            json: true,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        request(options,
            function(error, response, body) {
                if (error) {
                    //error handling
                }
            })
    })

    response.send("Message posted!")
})

app.listen(3000, () => {
    console.log("Server listening on port 3000!")
})