const Express = require("express");
const Router = Express.Router();
const {
    searchById,
    addReason,
    destroyReason,
    search,
    create,
    update,
    createWorker,
    destroyWorker,
} = require("../controllers/office-controller");

/**
 * Поиск офисов через объект полученный от yandex map api
 */
Router.post(
    "/search",
    search
);

/**
 *
 */
Router.post(
    "/create",
    create
);

/**
 *
 */
Router.post(
    "/:id",
    searchById
);

/**
 *
 */
Router.post(
    "/:id/update",
    update
);


/**
 *
 */
Router.post(
    "/:id/workers/create",
    createWorker
);


/**
 *
 */
Router.post(
    "/:id/workers/:w_id/destroy",
    destroyWorker
);


/**
 *
 */
Router.post(
    "/:id/reason/create",
    addReason
);

/**
 *
 */
Router.post(
    "/:id/reason/destroy",
    destroyReason
);

module.exports = { Router };