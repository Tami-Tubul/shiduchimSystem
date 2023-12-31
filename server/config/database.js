const mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/shiduchimDB").then(resp => console.log("mongo db connected")).catch(err => console.log(err))

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
}
module.exports = connectDB;