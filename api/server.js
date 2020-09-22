const express = require("express")
const app = express();

require("./models/main");

app.listen(8080, () => {
    console.log("App is listening on 8080");
})