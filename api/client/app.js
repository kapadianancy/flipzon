var express = require('express');
var path = require('path');

var route = require("./routes/route");


var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', route);

app.listen(8001,()=>
{
  console.log("server running at 8001");
});


//module.exports = app;
