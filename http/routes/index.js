const { app } = require("../server");

app.use(
    "/offices",
    require("./office").Router
);

