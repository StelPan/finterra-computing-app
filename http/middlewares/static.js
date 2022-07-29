const express = require("express");
const { app } = require("../server");

app.use(express.static("./static"));