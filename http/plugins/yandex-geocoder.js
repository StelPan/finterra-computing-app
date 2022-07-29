const YandexGeocoder = require("nodejs-yandex-geocoder");

const config = {
    apiKey: process.env.YANDEX_API_KEY
};

const Geocoder = new YandexGeocoder(config);

module.exports = { Geocoder };