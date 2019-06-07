const admin = require("firebase-admin");
const _ = require("lodash");

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
    },
    saveMovie: function(movie) {
        return new Promise((resolve, reject) => {
            database.checkMovieExists(movie.Title).then(movieExists => {
                if (movieExists) {
                    console.log("Cannot add the movie. The movie already exists in the database.");
                } else {
                    let data = {
                        "title": "",
                        "poster": "",
                        "actors": "",
                        "awards": "",
                        "country": "",
                        "director": "",
                        "genre": "",
                        "language": "",
                        "plot": "",
                        "rated": "",
                        "released": "",
                        "runtime": "",
                        "imdbRating": ""
                    };

                    // Convert movie attributes names to camelCase. Note: it is not recursive.
                    let normalizedData = _.mapKeys(movie, (value, key) => _.camelCase(key));
                    for (prop in data) {
                        data[prop] = normalizedData[prop];
                    }
                    
                    console.log("Adding movie to the database.");
                    admin.database().ref().child("movies").push(data).then((res) => {
                        resolve({
                            key: res.getKey(),
                            value: data
                        });
                    }).catch(reject);
                }
            });
        });
    },
    checkMovieExists: function(title) {
        let movieExists = false;
        return admin.database().ref().child("movies")
            .orderByChild("Title")
            .equalTo(title)
            .once("value")
            .then(snapshot => {
                snapshot.forEach((childSnapshot) => {
                    // If a movie was returned, then we know it already exists in the database
                    movieExists = true;
                });

                return movieExists;
            });
    },
    getMovieById: function(movieKey) {
        return admin.database().ref().child("movies")
            .once("value")
            .then(snapshot => {
                let movie;
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.key === movieKey) {
                        movie = childSnapshot;
                    }
                });

                return {
                    key: movieKey,
                    value: movie.val()
                };
            });
    },
    deleteMovie: function(movieKey) {
        return admin.database().ref().child("movies").child(movieKey).remove();
    },
    updateMovie: function(movieKey, changedData){
        return admin.database().ref().child("movies").child(movieKey).update(changedData);
    }
};

module.exports = database;
