const Express = require("express");
const Router = Express.Router();

const {
    create,
} = require("../controllers/region-controller");

/**
 *
 */
Router.post(
    "/create",
    create
);

module.exports = { Router };