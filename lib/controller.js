const core = require("./core");

let controller = {
    controllerTest: function() {
        console.log("This is a controller test function");
        console.log("Calling core test from controller...");
        core.coreTest();
    }
}

module.exports = controller;
