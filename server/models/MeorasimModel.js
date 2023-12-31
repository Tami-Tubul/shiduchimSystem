const mongoose = require('mongoose');

const meorasimSchema = mongoose.Schema({
    bachurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    bachuraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    bachurName: {
        type: String,
        required: true
    },
    bachuraName: {
        type: String,
        required: true
    },
    bachurFather: {
        type: String,
        required: true
    },
    bachuraFather: {
        type: String,
        required: true
    },
    bachurYeshiva: {
        type: String,
        required: true
    },
    bachuraSeminar: {
        type: String,
        required: true
    },
    bachurCity: {
        type: String,
        required: true
    },
    bachuraCity: {
        type: String,
        required: true
    },
    dateWort: {
        type: Date,
        required: true
    },
    matchmakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matchmaker'
    }
})
const Meorasim = new mongoose.model("meorasims", meorasimSchema);
module.exports = Meorasim;