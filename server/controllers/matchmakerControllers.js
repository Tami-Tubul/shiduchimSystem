const Matchmaker = require("../models/MatchmakerModel");


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

const addCandidateToCart = async (req, res, next) => { // הוספת מועמד לאזור אישי (שדכן)
    try {
        const matchmakerID = req.userConnect.id;
        const candidateID = req.params.id;
        const matchmaker = await Matchmaker.findOne({ _id: matchmakerID });
        if(!matchmaker){
            return res.status(400).json({ message: "שדכן לא נמצא" });
         }
         if (matchmaker.candidates.includes(candidateID)) {
            return res.status(400).json({ message: "מועמד זה כבר קיים בסל שלך" });
        }
         matchmaker.candidates = [...matchmaker.candidates , candidateID];
         matchmaker.save();
         res.status(200).json({ message: "המועמד נוסף לסל בהצלחה", candidatesOnCart: matchmaker.candidates });

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

const getDoneShiduchimOfMatchmaker = async (req, res, next) => { //שליפת כל השידוכים שהשדכן עשה

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
    closingMatch,
    getAllCandidateOnCart,
    addCandidateToCart,
    deleteCandidateFromCart,
    sendMessageToManager,
    getDoneShiduchimOfMatchmaker
}