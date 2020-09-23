const express = require("express")
const app = express();
const bodyParser = require("body-parser");
require("./models/main");

<<<<<<< HEAD
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./admin/controllers/index")(app);

app.use((err, req, res, next) => {
    if(err) {
      res.setHeader('Content-type', 'application/json');
      res.statusCode = err.statusCode;
      res.end(JSON.stringify({message: err.message}));
    }
});
>>>>>>> 1f2ccca1037bb6262737f57ec7b4bb19a051aaef

app.listen(8080, () => {
    console.log("App is listening on 8080");
})