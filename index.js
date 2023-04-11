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

// import in routes
// the landingRoutes object will refer to the Router object we
// exported out from the landing.js file.
const landingRoutes = require('./routes/landing');

async function main() {
    // we are telling Experss to consult the route registered in the
    // landingRoutes object, for a URL that begins with /
    app.use("/", landingRoutes);
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
