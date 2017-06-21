//Lets require/import the HTTP module
var express = require('express');
var bodyParser = require('body-parser');
var hometrack = require('./hometrack');

var app = express();

app.use(bodyParser.raw({type:"*/*"}));

app.post('/', function (req, res) {
	var data = req.body.toString();
	var response = hometrack(data);
	res.status(response.status).send(response.body);
});

app.get('/', function (req, res) {
	res.send('please refer to <a href="https://github.com/playedinane/hometrack">here</a>');
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Example app listening on port 3000!');
});