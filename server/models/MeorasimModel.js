const mongoose = require('mongoose');

const meorasimSchema = mongoose.Schema({
    bachurName: { type: String, },
    bachuraName: { type: String, },
    bachurAge: { type: String, },
    bachuraAge: { type: String, },
    bachurYeshiva: { type: String, },
    bachuraSeminar: { type: String, },
    bachurCity: { type: String, },
    bachuraCity: { type: String, },
    bachuraCity: { type: String, },
    date: { type: Date, },
    picture: { type: String, },//איך מועלים תמונה?
})
const Meorasim = new mongoose.model("meorasim", meorasimSchema);
module.exports = Meorasim;