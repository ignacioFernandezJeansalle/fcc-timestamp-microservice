// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/* 
[ ] A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number).
[ ] A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
[ ] A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
[ ] 

*/

app.get("/api/:date?", function (req, res) {
  // An empty date parameter should return the current time in a JSON object with a unix key and utc key
  if (!req.params.date) {
    const unix = Date.now();
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  const date = new Date(req.params.date).toString();

  // If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
  if (date === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: 1451001600000,
    utc: "Fri, 25 Dec 2015 00:00:00 GMT",
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
