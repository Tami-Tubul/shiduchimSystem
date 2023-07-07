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
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    candidates: [{  //מערך מועמדים
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    isApproved: {  // האם השדכנית אושרה ע"י המנהל או בהמתנה
        type: Boolean,
        default: false
    }
})
const Matchmaker = new mongoose.model("matchmakers", matchmakerSchema);
module.exports = Matchmaker;