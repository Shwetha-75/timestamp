var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
// get the date
app.get("/api/:date", (req, resp) => {
  let responseObject = {};
  if (Date.parse(req.params.date)) {
    let date = req.params.date;
    responseObject["unix"] = new Date(date).getTime();
    responseObject["utc"] = new Date(date).toUTCString();
  } else if (Number.parseInt(req.params.date)) {
    let date = req.params.date;
    responseObject["unix"] = Number(date);
    responseObject["utc"] = new Date(Number(date)).toUTCString();
  } else {
    responseObject["error"] = "Invalid Date";
  }

  resp.json(responseObject);
});
// present date
app
  .get("/api", (req, resp) => {
    let responseObject = {};
    responseObject["unix"] = new Date().getTime();
    responseObject["utc"] = new Date().toUTCString();
    return resp.json(responseObject);
  })

  .app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
  });

app.listen(process.env.PORT);
