const crypto = require('crypto');

const Matchmaker = require("../models/MatchmakerModel");
const Candidate = require("../models/CandidateModel");

const User = require("../models/UserModel");

const mail = require('../config/mailer')

//יצירת סיסמא אקראית לשדכן
function generatePassword() {
    const length = 8;
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

const approveMatchmaker = async (req, res, next) => {   //אישור שדכן חדש
    try {
        const matchmakerID = req.params.id;
        const matchmakerExist = await Matchmaker.findOne({ _id: matchmakerID });
        if (!matchmakerExist) {
            return res.status(400).json({ message: "שדכן לא נמצא" });
        }
        else if (matchmakerExist.isApproved) {
            return res.status(400).json({ message: "שדכן זה כבר רשום במערכת" });
        }
        else {
            matchmakerExist.isApproved = true; //המנהל מעדכן את השדכן למאושר
            await matchmakerExist.save();

            const user = new User({
                _id: matchmakerID,
                userName: matchmakerExist.email.split('@')[0],  //לוקח את ההתחלה של המייל
                password: generatePassword(), //סיסמא אקראית
                role: "matchmaker"
            });
            await user.save();

            const mailTo = matchmakerExist.email;
            const textMail = `שלום ${matchmakerExist.firstName}. התקבלת להיות שדכנית במערכת השידוכים שלנו! זוהי סיסמתך למערכת: ${user.password}`;

            mail.sendMail(mailTo, textMail);

            res.status(201).json({ message: "השדכן אושר על ידי המנהל ונוסף בהצלחה", newUser: user })

        }

    }
    catch (err) {
        next(err)
    }

}
const deleteMatchmaker = async (req, res, next) => { //מחיקת שדכן ושליחת הודעה במייל
    try {
        const matchmakerID = req.params.id;
        const matchmakerExist = await Matchmaker.findByIdAndDelete(matchmakerID);
        if (!matchmakerExist) {
            return res.status(400).json({ message: "שדכן לא נמצא" });
        }
        else {

            const mailTo = matchmakerExist.email;
            const textMail = `שלום ${matchmakerExist.firstName}. תודה על התעניינותך במערכת השידוכים שלנו. לצערנו, לא הצלחנו לקבל את בקשתך. מאחלים לך הצלחה בהמשך הדרך. `;

            mail.sendMail(mailTo, textMail);

            res.status(200).json({ message: "השדכן לא אושר על ידי המנהל והוסר מהמערכת" });
        }
    }
    catch (err) {
        next(err)
    }

}

const approveCandidate = async (req, res, next) => {   // אישור מועמד חדש
    try {
        const candidateID = req.params.id;
        const candidateExist = await Candidate.findOne({ _id: candidateID })
        if (!candidateExist) {
            return res.status(400).json({ message: "מועמד לא נמצא" });
        }
        else if (candidateExist.isApproved) {
            return res.status(400).json({ message: "מועמד זה כבר רשום במערכת" });
        }
        else {
            candidateExist.isApproved = true; //המנהל מעדכן את המועמד למאושר
            await candidateExist.save();

            res.status(201).json({ message: "המועמד נוסף בהצלחה למאגר" })
        }
    }
    catch (err) {
        next(err)
    }

}

const deleteCandidate = async (req, res, next) => { //מחיקת מועמד  ושליחת הודעה במייל
    try {
        const candidateID = req.params.id;
        const candidateExist = await Candidate.findByIdAndDelete(candidateID);
        if (!candidateExist) {
            return res.status(400).json({ message: "מועמד לא נמצא" });
        }
        else {

            const mailTo = 'tamit0430@gmail.com'; // candidateExist.email ;
            const textMail = `שלום ${candidateExist.firstName}. תודה על התעניינותך במערכת השידוכים שלנו. לצערנו, לא הצלחנו לקבל את בקשתך. מאחלים לך הצלחה בהמשך הדרך. `;

            mail.sendMail(mailTo, textMail);

            res.status(200).json({ message: "המועמד לא אושר על ידי המנהל והוסר מהמערכת" });
        }
    }
    catch (err) {
        next(err)
    }

}


const getAllMatchmakersCards = async (req, res, next) => { //הצגת כרטיסי שדכנים
    try {
        const allMatchmakers = await Matchmaker.find({})
        return res.status(200).json({ matchmakers: allMatchmakers });
    }
    catch (err) {
        next(err)
    }
}


const getAllMassagesFromMatchmakers = async (req, res, next) => { //הצגת הודעות משדכנים
    try {
        const allMatchmakers = await Matchmaker.find({})
        return res.status(200).json({ matchmakers: allMatchmakers });
    }
    catch (err) {
        next(err)
    }

}

const deleteMessageFromMatchmaker = async (req, res, next) => { //מחיקת הודעה ושליחת תשובה במייל
    try {

    }
    catch (err) {
        next(err)
    }

}


module.exports = {
    approveMatchmaker,
    deleteMatchmaker,
    approveCandidate,
    deleteCandidate,
    getAllMatchmakersCards,
    getAllMassagesFromMatchmakers,
    deleteMessageFromMatchmaker
}
