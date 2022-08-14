const { region } = require("../db/models");

const searchByName = async function (name) {
    return await region.findOne({
        where: { name }
    });
};

const create = async function (data) {
    return await region.create({
        ...data
    });
};

module.exports = {
    searchByName,
    create,
};