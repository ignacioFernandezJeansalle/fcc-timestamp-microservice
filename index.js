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


[ ] 

*/

app.get("/api/:date?", function (req, res) {
  // An empty date parameter should return the current time in a JSON object with a unix key and utc key
  if (!req.params.date) {
    const unix = Date.now();
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  const paramsDate = req.params.date;

  // A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number).
  // A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
  const date = Date.parse(paramsDate);
  const isDate = !isNaN(date);

  if (isDate) {
    const unix = date;
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  // A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
  const isUnix = new Date(parseInt(paramsDate)).toString() !== "Invalid Date";

  console.log({ paramsDate, isDate, isUnix });

  if (isUnix) {
    const unix = parseInt(paramsDate);
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  // If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
  return res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
