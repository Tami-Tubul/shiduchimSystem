const Candidate = require("../models/CandidateModel");
const Matchmaker = require("../models/MatchmakerModel");
const Meorasim = require("../models/MeorasimModel");


const registerMatchmaker = async (req, res, next) => {  //הרשמת שדכן
    try {
        const { firstName, lastName, phone, livingPlace, age, email } = req.body;
        if (!(firstName && lastName && phone && email)) {
            return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
        }
        const matchmakerExist = await Matchmaker.findOne({ $or: [{ email: email }, { phone: phone }] });

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

const registerCandidate = async (req, res, next) => {  //מילוי שאלון הרשמה למועמד
    try {
        const nonMandatoryFields = ["picture", "requireMoney", "CommitMoney", "drishotCharacters", "drishotNotMoza"] //שדות לא חובה
        const mandatoryFields = Object.keys(req.body).filter(field => !nonMandatoryFields.includes(field)); //שדות חובה
        const candidate = req.body;  //כל השדות 
        const missingFields = [];

        mandatoryFields.forEach(field => {  //בדיקה האם כל שדות החובה מולאו
            if (candidate[field] === undefined || candidate[field] === null) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `יש למלא את כל שדות החובה. השדות החסרים הם: ${missingFields.join(', ')}` });
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

const getAllDoneShiduchim = async (req, res, next) => { //שליפת כל השידוכים של האתר (משמש גם להצגת הנתונים בגרף סטטיסטיקות) 
    try {
        const allMeorasim = await Meorasim.find({})
        return res.status(200).json({ meorasim: allMeorasim });
    }
    catch (err) {
        next(err)
    }

}


module.exports = {
    registerMatchmaker,
    registerCandidate,
    getAllDoneShiduchim

}