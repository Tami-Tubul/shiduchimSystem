
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }

})
const User = new mongoose.model("users", userSchema);
module.exports = User;