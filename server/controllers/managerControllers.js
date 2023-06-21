const crypto = require('crypto');

const Matchmaker = require("../models/MatchmakerModel");
const User = require("../models/UserModel");

const mail = require('../config/mailer')

//יצירת סיסמא אקראית לשדכן
function generatePassword() {
    const length = 8;
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

const approveMatchmaker = async (req, res, next) => {   //אישור שדכן והכנסתו למאגר השדכנים במערכת
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
const deleteMatchmaker = async (req, res, next) => {
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

//פה יהיו פונקציות אישור ומחיקת מועמד


const getAllNewRegisters = async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }

}
const deleteUsers = async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }

}
const getAllMassagesFromUsers = async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }

}
const getAllMassagesFromMatchmakers = async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }

}
module.exports = {
    approveMatchmaker,
    deleteMatchmaker,
    getAllNewRegisters,
    deleteUsers,
    getAllMassagesFromUsers,
    getAllMassagesFromMatchmakers,

}
