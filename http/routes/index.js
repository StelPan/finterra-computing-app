const { app } = require("../server");

app.use(
    "/offices",
    require("./office").Router
);

app.use(
    "/regions",
    require("./region").Router
);

