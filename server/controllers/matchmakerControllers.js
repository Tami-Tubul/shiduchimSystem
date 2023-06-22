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

const getAllCandidateOnCart = async (req, res, next) => { //שליפת מועמדים מהאזור האישי
    try {
        const matchmakerID = req.userConnect.id;
        const matchmaker = await Matchmaker.findOne({ _id: matchmakerID });
        if(!matchmaker){
           return res.status(400).json({ message: "שדכן לא נמצא" });
        }
        const candidatesForMatchmaker = matchmaker.candidates;
        res.status(200).json({ candidatesOnCart: candidatesForMatchmaker });

    }
    catch (err) {
        next(err)
    }

}

const deleteCandidateFromCart = async (req, res, next) => { //הסרת מועמד מהאזור האישי
    try {
        const matchmakerID = req.userConnect.id;
        const candidateID = req.params.id;
        const matchmakerAfterRemoveCandidate = await Matchmaker.findByIdAndUpdate(
            matchmakerID,
            { $pull: { candidates: candidateID } }, //מחיקת ID של המועמד מהשדכן
            { new: true })  //החזרת אובייקט שדכן מעודכן לאחר ההסרה
        res.status(200).json({ message: "המועמד הוסר מהסל בהצלחה", candidates: matchmakerAfterRemoveCandidate.candidates }) //החזרת מערך מועמדים מעודכן לאחר ההסרה
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
        // אין לוגיקה לשרת. אמור להיות מיושם בצד לקוח
    }
    catch (err) {
        next(err)
    }

}
const printQuestionPage = async (req, res, next) => { //הדפסת שאלון.
    try {
        //אין לוגיקה לשרת. אמור להיות מיושם בצד לקוח
    }
    catch (err) {
        next(err)
    }

}

module.exports = {
    registerMatchmaker,
    closingMatch,
    getAllCandidateOnCart,
    deleteCandidateFromCart,
    sendMessageToManager
}