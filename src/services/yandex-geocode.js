import axios from "axios";

const YandexGeocode = function (key, format = "json") {
    if (typeof key !== "string") {
        throw new TypeError("Parameter 'key' must be a string type.");
    }

    if (!key.length) {
        throw new Error("Key is not defined.");
    }

    this.url = new URL("https://geocode-maps.yandex.ru/1.x/");

    this.url.searchParams.set("apikey", key);

    this.url.searchParams.set("format", format);

    /**
     *
     * @param kinds
     */
    this.changeKind = function (kinds) {
        this.url.searchParams.set("kind", kinds);
    }

    /**
     *
     * @param data
     */
    this.changeGeocode = function (data) {
        this.url.searchParams.set("geocode", data);
    }

    /**
     *
     * @param format
     */
    this.changeFormat = function (format) {
        this.url.searchParams.set("format", format);
    }

    this.geocode = async function () {
        return axios.get(this.url.href);
    }
};

// TODO: Change setting api key
const Geocoder = new YandexGeocode(process.env.YANDEX_API_KEY);

/**
 *
 * @param data
 * @returns {Promise<any>}
 */
export const geocode = async function (data) {
    Geocoder.changeGeocode(data);
    const response = await Geocoder.geocode(data);
    return response.data;
}