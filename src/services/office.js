import axios from "../plugins/axios";

/**
 *
 * @returns {Promise<any>}
 * @param geoObject
 */
export const search = async (geoObject) => {
    const response = await axios.post("/offices/search", geoObject);
    return response.data.offices;
};

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
export const searchById = async (id) => {
    const response = await axios.post(`/offices/${id}`);
    return response.data.office;
};


/**
 *
 * @param data
 * @returns {Promise<any>}
 */
export const create = async (data) => {
    const response = await axios.post("/offices/create", data);
    return response.data;
};

/**
 *
 * @param id
 * @param data
 * @returns {Promise<*>}
 */
export const update = async (id, data) => {
    const response = await axios.post(`/offices/${id}/update`, data);
    return response.data;
};

/**
 *
 * @param id
 * @param reason
 * @returns {Promise<*>}
 */
export const addReasons = async (id, reason) => {
    const response = await axios.post(`/offices/${id}/reason/create`, { reason });
    return response.data;
};

/**
 *
 * @param id
 * @param data
 * @returns {Promise<*>}
 */
export const createWorker = async (id, data) => {
    const response = await axios.post(`/offices/${id}/workers/create`, data);
    return response.data;
};

/**
 *
 * @param office_id
 * @param worker_id
 * @returns {Promise<*>}
 */
export const updateWorker = async (office_id, worker_id) => {
    const response = await axios.post(`/offices/${office_id}/workers/${worker_id}/update`);
    return response.data;
};

/**
 *
 * @param office_id
 * @param worker_id
 * @returns {Promise<*>}
 */
export const destroyWorker = async (office_id, worker_id) => {
    const response = await axios.post(`/offices/${office_id}/workers/${worker_id}/destroy`);
    return response.data;
};

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
export const destroyReason = async (id) => {
    const response = await axios.post(`/offices/${id}/reason/destroy`);
    return response.data;
};