const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require("path");
const clientRoute = require("./client/routes/route")
require("./models/main");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", clientRoute);
require("./admin/controllers/index")(app);

// app.use((err, req, res, next) => {
//     if(err) {
//       res.setHeader('Content-type', 'application/json');
//       res.statusCode = err.statusCode;
//       res.end(JSON.stringify({message: err.message}));
//     }
// });

app.listen(8080, () => {
    console.log("App is listening on 8080");
})
