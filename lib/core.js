const database = require("./database");

let core = {
    coreTest: function() {
        console.log("This is a core test function");
        console.log("Calling database test from core...");
        database.databaseTest();
    }
}

module.exports = core;
