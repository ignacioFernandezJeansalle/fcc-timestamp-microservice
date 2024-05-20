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
  const paramsDate = req.params.date;

  // Parámetro date vacío
  if (!paramsDate) {
    const unix = Date.now();
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  // Parámetro date = date
  const date = Date.parse(paramsDate);
  const isValidDate = !isNaN(date);

  if (isValidDate) {
    const unix = date;
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  // Parámetro date = unix
  const unix = parseInt(paramsDate);
  const isValidUnix = new Date(unix).toString() !== "Invalid Date";

  if (isValidUnix) {
    const utc = new Date(unix).toUTCString();

    return res.json({ unix: unix, utc: utc });
  }

  // Parámetro date = inválido
  return res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
