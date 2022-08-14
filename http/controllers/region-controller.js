const RegionService = require("../services/region");

/**
 * Create new region end-point
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const create = async function (req, res) {
    try {
        const { body } = req;

        const findRegion = await RegionService.searchByName(body.name);
        if (findRegion) {
            return res.status(405).json({
                error: "EXIST_REGION",
                msg: "Regions is exist"
            });
        }
        const createRegion = await RegionService.create({
            ...body
        });

        return res.status(200).json({
           region: createRegion,
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    create,
};