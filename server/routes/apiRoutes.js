const express = require("express")
const app = express()
const authRoutes = require("./authRoutes");
const managerRoutes = require("./managerRoutes");
const matchmakerRoutes = require("./matchmakerRoutes");
const candidatesRoutes = require("./candidatesRoutes");
const commonRoutes = require("./commonRoutes");


app.use("/auth", authRoutes);
app.use("/manager", managerRoutes);
app.use("/matchmaker", matchmakerRoutes);
app.use("/candidate", candidatesRoutes);
app.use("/common", commonRoutes);


module.exports = app