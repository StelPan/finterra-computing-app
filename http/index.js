require("dotenv").config({
    url: "../.env"
});

const { app } = require("./server");

const {
    APP_HOST,
    APP_PORT,
} = require("./config/server");

// Include Middlewares
require("./middlewares");

// Include Routes
require("./routes");

const callback = function () {
    console.log(`Server started on port: ${APP_PORT}`);
};

app.listen(
    APP_PORT,
    APP_HOST,
    callback
);
