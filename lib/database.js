const core = require("./core");
const admin = require("firebase-admin");

let database = {
    getAllMovies: function() {
        let movies = [];
        return admin.database().ref().child("movies")
            .once("value")
            .then(snapshot => {
                snapshot.forEach((childSnapshot) => {
                    movies.push(childSnapshot);
                });

                return movies;
            });
    }
};

module.exports = database;
