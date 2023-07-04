const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({

    firstName: { type: String, required: true },//שם פרטי
    lastName: { type: String, required: true },//שם משפחה
    gender: { type: String, required: true }, //מין
    age: { type: Number, required: true },//גיל
    email: { type: String, required: true }, // מייל
    status: { type: String, required: true },//מצב משפחתי
    bornDate: { type: Date, required: true },//תאריך לידה
    countryBirth: { type: String, required: true },//ארץ לידה
    city: { type: String, required: true },//עיר
    phone: { type: String, required: true },//טלפון
    characters: { type: String, required: true },//תכונות אופי
    colorSkin: { type: String, required: true },//גוון עור
    height: { type: mongoose.Schema.Types.Decimal128, required: true },//גובה
    bodyStracture: { type: String, required: true },//מבנה גוף
    healthCondition: { type: String, required: true },//מצב בריאותי
    economicCondition: { type: String },//מצב כלכלי
    look: { type: String, required: true },//מראה כללי
    sector: { type: String, required: true },//מגזר
    picture: { type: String },//תמונה
    requireMoney: { type: Number },//דרישות כספיות
    CommitMoney: { type: Number },//התחייבויות כספיות
    yeshivaOrSeminar: { type: String, required: true },//שם מקום לימודים
    doingToday: { type: String, required: true },//עיסוק כיום
    origin: { type: String, required: true },//עידה
    fatherName: { type: String, required: true },//שם האב
    motherName: { type: String, required: true },//שם האם
    fatherDoing: { type: String, required: true },//עיסוק אב
    motherDoing: { type: String, required: true },//עיסוק אם
    mozaAv: { type: String, required: true },//מוצא אב
    mozaEm: { type: String, required: true },//מוצא אם
    siblings: { type: Number, required: true },//מס אחים ואחיות
    halachaMethod: { type: String, required: true },//שיטה הלכתית
    drishotSector: { type: String, required: true },//דרישות-שיוך מגזרי
    drishotLook: { type: String, required: true },//דרישות-מראה כללי
    drishotCharacters: { type: String },//דרישות-תכונות אופי
    drishotFavoriteMoza: { type: String, required: true },//דרישות-ארץ מוצא מועדף
    drishotNotMoza: { type: String },//דרישות לא ממוצא
    drishotHeaddress: { type: String, required: true },//דרישות-כיסוי ראש
    fromAge: { type: Number, required: true },//מגיל
    mostAge: { type: Number, required: true },//עד גיל
    fromHigh: { type: mongoose.Schema.Types.Decimal128, required: true },//מגובה
    mostHigh: { type: mongoose.Schema.Types.Decimal128, required: true },//עד גובה
    casherPhone: { type: Boolean, required: true },//טלפון כשר
    licence: { type: Boolean, required: true },//רישיון
    smoking: { type: Boolean, required: true },//מעשן
    isApproved: {  // האם המועמד אושר ע"י המנהל או בהמתנה
        type: Boolean,
        default: false
    },
    pendingDeletion: { //האם המועמד סומן למחיקה או לא
        type: Boolean,
        default: false
    }
});

const Candidate = new mongoose.model("candidates", candidateSchema);
module.exports = Candidate;