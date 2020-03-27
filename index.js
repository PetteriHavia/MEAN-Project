const PORT = process.env.PORT || 5000;
var http = require("http");
var fs = require("fs");
var express = require ("express");
var app = express();
var bodyParser = require("body-parser");

//Body-parser
app.use(bodyParser.urlencoded({ extended: true}));
//Express
app.use(express.static(__dirname + '/demosite'));

//ROUTES
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/demosite/index.html');
});

app.get('/guestbook', function (req, res) {
    //Load File
    var data = require('./demosite/json_guestbook_data.json');
    //Parse data
    var result = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">';
    result += '<table  style="width: auto; " class="table table-striped table-condensed" border="1" align="center">';

    for (var i=0; i < data.length; i++) {
        result +=
        '<tr>' +
            '<td>'+ data[i].username +'</td>' +
            '<td>'+ data[i].country +'</td>' +
            '<td>'+ data[i].message +'</td>' +
            '<td>'+ data[i].date +'</td>' +
        '</tr>'
    }
    res.send(result);
});


app.post('/newmessage', function (req, res) {

    var data = require("./demosite/json_guestbook_data.json");

    //Push data
    data.push({
        "username": req.body.name,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });
    
    //Convet the JSON object
    var jsonStr = JSON.stringify(data);

    //Write the new information in the file
    fs.writeFile('./demosite/json_guestbook_data.json', jsonStr, (err) => {
        if(err) throw err;
        console.log("Data saved");
    });
    res.send("Saved data to file json_guestbook_data.json type /guestbook to have a look")
});


app.get('/newmessage', function (req, res) {
    res.sendFile(__dirname + '/demosite/newmessage.html');
});

app.post('/ajaxmessage', function (req, res) {

    var name = req.body.username;
    var country = req.body.country;
    var message = req.body.message
    console.log(name, country, message);

    var data = require("./demosite/json_guestbook_data.json");

    //Push data
    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });
    
    //Convet the JSON object
    var jsonStr = JSON.stringify(data);

    //Write the new information in the file
    fs.writeFile('./demosite/json_guestbook_data.json', jsonStr, (err) => {
        if(err) throw err;
        console.log("Data saved"); 
    });

    //Parse data
    var result = '<table border="1" align="center">';

    for (var i=0; i < data.length; i++) {
        result +=
        '<tr>' +
            '<td>'+ data[i].username +'</td>' +
            '<td>'+ data[i].country +'</td>' +
            '<td>'+ data[i].message +'</td>' +
            '<td>'+ data[i].date +'</td>' +
        '</tr>'
    }
    res.send(result);
});


app.get('/ajaxmessage', function (req, res) {
    res.sendFile(__dirname + '/demosite/ajaxmessage.html');
});


app.listen(PORT);
 console.log("App running at port:5000")

/*
//create a server object:
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World!\n"); //write a response to the client
    response.end("This is the end"); //end the response
  })
  .listen(PORT); //the server object listens on port 8080
*/