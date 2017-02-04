const ACCESS_TOKEN = 'xoxp-45409264581-63227063794-137134327652-8f78dc483a8905cdffbe170e43d3a0e4';

var express = require('express')
var http = require('http');
var request = require('request');
var parser = require('body-parser');

var app = express()
app.use(parser.json());

app.get('/', (req, resp) => {
    response.send("Server active!")
})

app.get('/test', function(req, resp) {

    var peeps = ['@kurtlogan', '@chrissysemens', '@shaun'];
    var peep = peeps[Math.floor((Math.random() * peeps.length) + 1)];

    request('http://api.adviceslip.com/advice', function(error, response, body) {
        if (error) {
            //error handling here
        }

        var quoteResponse = JSON.parse(response.body);
        var quoteText = peep + ', ' + quoteResponse.slip.advice;

        console.log(quoteText);

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
        };

        request(options,
            function(error, response, body) {
                if (error) {
                    //error handling
                }
            })
    });
    resp.send("Message posted!")
});

app.listen(3000, () => {
    console.log("Server listening on port 3000!")
})