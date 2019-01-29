var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var crypto = require('crypto');
var multer = require('multer');
var mime = require('mime');
const cors = require('cors')

const corsOptions = {
    origin: "*"

}


// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: ""
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("SQL connection established.");
// });

var app = express().use(express.static(
    path.join(__dirname, '')
))

app.use(cors(corsOptions));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


app.post('/api/test', function(req, res) {
    console.log(req.body);
    res.send({
        response: "its gucci"
    });
})

console.log('Server running: http://localhost:8080')
app.listen(8080);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});