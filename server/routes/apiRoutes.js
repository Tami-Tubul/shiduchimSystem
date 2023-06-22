const express = require("express")
const app = express()
const authRoutes = require("./authRoutes");
const managerRoutes = require("./managerRoutes");
const matchmakerRoutes = require("./matchmakerRoutes");
const publicRoutes = require("./publicRoutes");


app.use("/auth", authRoutes);
app.use("/manager", managerRoutes);
app.use("/matchmaker", matchmakerRoutes);
app.use("/public", publicRoutes);


module.exports = app