const Path = require("path");
const { Op } = require("sequelize");
const { office, office_worker } = require(Path.resolve("http", "db", "models"));

const search = async function (req, res) {
    try {
        const { metaDataProperty, featureMember } = req.body.response.GeoObjectCollection;
        const { Address } = featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData;
        const { formatted } = Address;
        const offices = await office.findAll({
            where: { full_address: { [Op.substring]: formatted } }
        });
        return res.status(200).json({ offices });
    } catch (e) {
        console.error(e);
    }
}

const searchById = async function (req, res) {
    try {
        const { id } = req.params;
        const findOffice = await office.findByPk(
            id,
            { include: { model: office_worker }
        });

        return res.status(200).json({
            office: findOffice
        });
    } catch (e) {
        console.error(e);
    }
}

const create = async function (req, res) {
    try {
        const searchParams = req.body;
        const { form, geocode } = searchParams;
        const { Point, metaDataProperty } = geocode.featureMember[0].GeoObject;
        const { Components, formatted } = metaDataProperty.GeocoderMetaData.Address;
        const positions = ((components) => {
            let obj = {};
            for (let component of components) {
                obj[component.kind] = component.name;
            }
            return obj;
        })(Components);

        const { pos } = Point;

        const saveParams = {
            name: form.name,
            work_time: form.work_time,
            coords: pos,
            full_address: formatted,
            title: form.title,
            phone: form.phone,
            email: form.email,
            ...positions
        };

        const createOffice = await office.create(saveParams);

        return res.status(200).json({
            office: createOffice
        });
    } catch (e) {
        console.error(e);
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const update = async function (req, res) {
    try {
        const { geocode, form } = req.body;

        const updateOffice = await office.update({
            ...geocode,
            ...form,
        });

        return res.status(200).json({ update: updateOffice });
    } catch (e) {
        console.error(e);
    }
};


const destroyReason = async function (req, res) {
    try {
        const { id } = req.params;
        const findOffice = await office.findByPk(id);

        await findOffice.update({ reason: null });
        return res.status(200).json({ mes: "ok" });
    } catch (e) {
        console.error(e);
    }
};


const addReason = async function (req, res) {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const findOffice = await office.findByPk(id);

        await findOffice.update({ reason });

        return res.status(200).json({ mes: "ok" });
    } catch (e) {
        console.error(e);
    }
};

const createWorker = async function (req, res) {
    try {
        const { id } = req.params;
        const workerData = req.body;

        const createOfficeWorker = await office_worker
            .create({
                office_id: id,
                ...workerData
            });

        return res.status(201).json({
            create: createOfficeWorker,
        });
    } catch (e) {
        console.error(e);
    }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const destroyWorker = async function (req, res) {
    try {
        const { w_id } = req.params;

        await office_worker.destroy({ where: { id: w_id }});

        return res.status(201).json({
            destroy: true,
        });
    } catch (e) {
        console.error(e);
    }
};


module.exports = {
    search,
    create,
    update,
    searchById,
    createWorker,
    destroyWorker,
    addReason,
    destroyReason,
};