const Matchmaker = require("../models/MatchmakerModel");


const registerMatchmaker = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, livingPlace, age, email } = req.body;
        if (!(firstName && lastName && phone && livingPlace && age && email)) {
            return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
        }
        const matchmakerExist = await Matchmaker.findOne({ email, phone });

        if (matchmakerExist) {
            return res.status(400).json({ message: "שדכן זה כבר קיים במערכת" });
        }
        else {
            const newMatchmaker = new Matchmaker({
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                livingPlace: livingPlace,
                age: age,
                email: email
            })
            await newMatchmaker.save();
            res.status(201).json({ message: "נרשמת בהצלחה! פרטיך נבדקים במערכת, במידה והתקבלת תקבלי סיסמא למייל.", newMatchmaker: newMatchmaker })
        }

    }
    catch (err) {
        next(err)
    }

}

const closingMatch = async (req, res, next) => { //סגירת שידוך
    try {

    }
    catch (err) {
        next(err)
    }

}

const addCandidateToCart = async (req, res, next) => { //הוספת מועמד לאזור אישי
    try {

    }
    catch (err) {
        next(err)
    }

}

const deleteCandidateFromCart = async (req, res, next) => { //הסרת מועמד מהאזור האישי
    try {

    }
    catch (err) {
        next(err)
    }

}


const sendMessageToManager = async (req, res, next) => { //שליחת הודעה למנהל
    try {

    }
    catch (err) {
        next(err)
    }

}
const sendLinkOfWebsite = async (req, res, next) => { //שיתוף קישור האתר

    try {

    }
    catch (err) {
        next(err)
    }

}
const printQuestionPage = async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }

}

module.exports = {
    registerMatchmaker,
    closingMatch,
    addCandidateToCart,
    deleteCandidateFromCart,
    sendMessageToManager,
    sendLinkOfWebsite,
    printQuestionPage,
}