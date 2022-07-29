const Util = require("util");
const { Geocoder } = require("../plugins/yandex-geocoder");

const resolve = Util.promisify(Geocoder.resolve);

const geocode = async (address) => {
    try {
        console.log(address);
        return Geocoder.resolve(address, function (err, res) {
            console.log(err);
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = { geocode };