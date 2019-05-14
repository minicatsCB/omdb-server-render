const express = require("express");
const app = express();
const port = 3000;

const admin = require("firebase-admin");
const controller = require("./lib/controller.js");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://omdb-exercise.firebaseio.com"
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    controller.getAllMovies().then(allMovies => {
        res.render("index", { movies: allMovies});
    });
});

app.listen(port, () => console.log("Listening on port " + port));
