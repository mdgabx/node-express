let express = require('express');
let app = express();

// console.log("Hello World");
// console.log(process.env.MESSAGE_STYLE)

// logger middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

//define routes
app.use(logger);

// middleware get time server
app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
  }, function(req, res) {
    res.json({ "time": req.time })
  }
);


// styles
app.use('/public', express.static(__dirname + "/public"));

// load the html page
app.get('/', function(req, res) {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

// check the .env variable
app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ "message": "HELLO JSON" })
  } else {
    res.json({ "message": "Hello json" })
  }
});











module.exports = app;
