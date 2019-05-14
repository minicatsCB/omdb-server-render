const database = require("./database");

let controller = {
    getAllMovies: database.getAllMovies
}

module.exports = controller;
