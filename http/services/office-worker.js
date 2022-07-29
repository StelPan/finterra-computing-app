const Path = require("path");
const { office_worker } = require(Path.resolve("http", "db", "models"));

/**
 *
 * @param office_id
 * @param job_title
 * @param full_name
 * @param phone
 * @param email
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const create = async ({ office_id, job_title, full_name, phone, email }) => {
    return await office_worker.create({
        office_id,
        job_title,
        full_name,
        phone,
        email
    });
};

module.exports = {
    create,
}