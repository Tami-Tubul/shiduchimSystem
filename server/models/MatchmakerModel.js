const mongoose = require('mongoose');

const matchmakerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    livingPlace: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    candidates: [Number],//מערך מועמדים
    isApproved: {  // האם השדכנית אושרה ע"י המנהל או בהמתנה
        type: Boolean, 
        default: false
    } 
})
const Matchmaker = new mongoose.model("matchmakers", matchmakerSchema);
module.exports = Matchmaker;