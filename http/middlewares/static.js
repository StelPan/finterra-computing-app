const express = require("express");
const path = require("path");
const { app } = require("../server");

app.use(express.static(path.resolve("http", "static")));