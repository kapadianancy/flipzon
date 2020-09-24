const express = require("express")
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors')
require("./models/main");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
require("./admin/controllers/index")(app);

app.use((err, req, res, next) => {
    if(err) {
      res.setHeader('Content-type', 'application/json');
      res.statusCode = err.statusCode;
      res.end(JSON.stringify({message: err.message}));
    }
});

app.listen(8080, () => {
    console.log("App is listening on 8080");
})