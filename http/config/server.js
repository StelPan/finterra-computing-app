const APP_PORT = process.env.NODE_ENV === "production" ? 53272 : 3000;

const APP_HOST = process.env.NODE_ENV === "production" ? "127.0.4.32" : "127.0.0.1";

module.exports = {
    APP_PORT,
    APP_HOST,
};