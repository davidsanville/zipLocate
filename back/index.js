var express = require('express');
var mysql = require('mysql');

var app = express();
var con = mysql.createConnection({
    host: 'test4.cglk3nbbfptv.us-west-2.rds.amazonaws.com',
    user: 'marshes',
    password: 'andFroz3',
    database: 'test4',
    acquireTimeout: 1000000
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/getZips', function(req, res) {
    console.log("GET: Received a getZips request.");
    
    con.connect(function(err) {
	if (err) throw err;
	var queryString = "SELECT name, id FROM tutors WHERE zip='" + req.query.zip + "'";
	con.query(queryString, function(err, result, fields) {
	    if (err) {
		console.log(err);
		res.status(400).send({result: 'failure'});
	    }
	    console.log(result);
	    var jsonResults = result.map((i) => i.name);
	    res.status(200).send({result:jsonResults});
	});
    });
});

app.listen(8080, function(){
    console.log("Listening on port 8080...");
});
