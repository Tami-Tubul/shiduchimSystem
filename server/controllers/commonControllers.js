const Candidate = require("../models/CandidateModel");


const registerCandidate = async (req, res, next) => {  //מילוי שאלון הרשמה למועמד
    try {
        const nonMandatoryFields = ["picture", "requireMoney", "CommitMoney", "drishotCharacters", "drishotNotMoza"] //שדות לא חובה
        const mandatoryFields = Object.keys(req.body).filter(field => !nonMandatoryFields.includes(field)); //שדות חובה
        const candidate = req.body;  //כל השדות 
        const hasAllMandatoryFields = mandatoryFields.every(field => candidate[field]); //בדיקה האם כל שדות החובה מולאו

        if (!hasAllMandatoryFields) {
            return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
        }

        const candidateExist = await Candidate.findOne({ email: candidate.email, phone: candidate.phone });

        if (candidateExist) {
            return res.status(400).json({ message: "מועמד זה כבר קיים במערכת" });
        }
        else {
            const newCandidate = new Candidate(candidate)

            await newCandidate.save();
            res.status(201).json({ message: "פרטיך התקבלו בהצלחה! פרטיך יבדקו על ידי המערכת ויועלו לאתר במידה והנך מתאים לדרישות האתר.", newCandidate: newCandidate })
        }

    }
    catch (err) {
        next(err)
    }

}

const getAllDoneShiduchim = async (req, res, next) => { //הצגת כל השידוכים של האתר (משמש גם להצגת הנתונים בגרף סטטיסטיקות) 
    try {
    }
    catch (err) {
        next(err)
    }

}


const filterCandidatesCards = async (req, res, next) => {  //סינון מועמדים (שדכן ומנהל)
    try {

    }
    catch (err) {
        next(err)
    }

}


const getAllCandidatesCards = async (req, res, next) => {  //הצגת כרטיסי מועמדים (שדכן ומנהל)
    try {

    }
    catch (err) {
        next(err)
    }

}

module.exports = {
    registerCandidate,
    getAllDoneShiduchim,
    filterCandidatesCards,
    getAllCandidatesCards
}