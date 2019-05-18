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
        let parsedMovies = allMovies.map(movie => {
            return {
                key: movie.key,
                value: movie.val()
            };
        });
        res.render("index", { movies: parsedMovies});
    });
});

app.get("/create", (req, res) => {
    controller.saveMovie(req.query.title).then(movie => {
        res.render("index", { movies: [movie] });
    });
});

app.get("/movie/:id", (req, res) => {
    controller.getMovieById(req.params.id).then(movie => {
        res.render("movie", { movie: movie });
    });
});

app.get("/movie/:id/delete", (req, res) => {
    controller.deleteMovie(req.params.id).then(movie => {
        res.redirect("/");
    });
});

app.listen(port, () => console.log("Listening on port " + port));
