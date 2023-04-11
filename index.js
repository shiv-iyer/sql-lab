// all the requirements.
// express: host the server
const express = require("express");
// hbs and wax: for handlebars
const hbs = require("hbs");
const wax = require("wax-on");
// .env: for environment variables, hiding stuff etc.
require("dotenv").config();

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

async function main() {
  
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
