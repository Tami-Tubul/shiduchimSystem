const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    nameOfSender: {
        type: String,
        required: true
    },
    emailofSender: {
        type: String,
        required: true
    },
    textMessage: {
        type: String,
        required: true
    },
    dateOfSending: {
        type: Date,
        default: Date.now //תאריך של אותו יום בו נשלחה ההודעה
    },
})
const Message = new mongoose.model("messages", messageSchema);
module.exports = Message;