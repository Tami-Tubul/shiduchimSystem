const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/shiduchimDB").then(resp => console.log("mongo db connected")).catch(err => console.log(err))
