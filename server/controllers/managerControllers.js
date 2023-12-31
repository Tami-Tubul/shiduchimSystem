const crypto = require('crypto');

const Matchmaker = require("../models/MatchmakerModel");
const Candidate = require("../models/CandidateModel");
const User = require("../models/UserModel");
const Message = require("../models/MessageModel");

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
            const textMail = `שלום ${matchmakerExist.firstName}. התקבלת להיות שדכנית במערכת השידוכים שלנו! זהו שם המשתמש והסיסמא שלך למערכת: \n שם משתמש: ${user.userName} \n סיסמא: ${user.password}`;

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

             const mailTo = candidateExist.email;
             const textMail = `שלום ${candidateExist.firstName}.\n התקבלת למאגר המועמדים שלנו!\n בקרוב תיצור איתך קשר שדכנית מהמאגר שלנו ותתחיל להציע לך שידוכים.\n בברכת הצלחה וסיעתא דשמיא,\n אתר שידוכים`
             mail.sendMail(mailTo, textMail);

            res.status(201).json({ message: "המועמד נוסף בהצלחה למאגר" })

            //תזמון שליחת מייל פעם בחודש מתאריך זה --- בוטל ---- הועבר לפונקציה שבלחיצת כפתור שולחת לו מייל

            // const mailTo = candidateExist.email;
            // const textMail = `שלום ${candidateExist.firstName}. זוהי בדיקת רלוונטיות חודשית. האם אתה עדיין מחפש שידוך? השב בכן או לא כדי שהמערכת תדע האם להסיר אותך מהמאגר. תודה.`;
            // const task = mail.sendMail(mailTo, textMail, true);

            //במידה והמועמד השיב שהוא כבר לא רלוונטי
            //candidateExist.remove();   //הסרת המועמד מטבלת המועמדים
            //res.status(200).json({ message: "המועמד הוסר בהצלחה מהמאגר" })
            //task.destroy(); //הפסקת תזמון המייל החודשי

        }
    }
    catch (err) {
        next(err)
    }

}

const deleteCandidate = async (req, res, next) => { //מחיקת מועמד ושליחת הודעה במייל
    try {
        const candidateID = req.params.id;
        const candidateExist = await Candidate.findByIdAndDelete(candidateID);
        if (!candidateExist) {
            return res.status(400).json({ message: "מועמד לא נמצא" });
        }
        else {

            const mailTo = candidateExist.email;
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
        const allMessages = await Message.find({})
        return res.status(200).json({ messages: allMessages });
    }
    catch (err) {
        next(err)
    }

}

const deleteMessageFromMatchmaker = async (req, res, next) => { //מחיקת הודעה מהשדכן
    try {
        const messageID = req.params.id;
        const messageExist = await Message.findByIdAndDelete(messageID);
        if (!messageExist) {
            return res.status(400).json({ message: "הודעה לא נמצאה" });
        }
        else {
            res.status(200).json({ message: "ההודעה הוסרה בהצלחה" });
        }
    }
    catch (err) {
        next(err)
    }

}

const removingIrrelevantCandidate = async (req, res, next) => { // המנהל מוחק מועמד לא רלוונטי שסומן להסרה ע"י השדכן
    try {
        const candidateID = req.params.id;

        const candidateExist = await Candidate.findOne({ _id: candidateID });

        if (!candidateExist) {
            return res.status(404).json({ message: "מועמד לא נמצא" });
        }

        const markToRemoval = await Candidate.findOneAndRemove({ _id: candidateID, pendingDeletion: true });

        if (!markToRemoval) {
            return res.status(400).json({ message: "מועמד לא סומן להסרה על ידי השדכן" });
        }

        else {
            res.status(200).json({ message: "המועמד הוסר בהצלחה מהמערכת" });
        }
    }
    catch (err) {
        next(err)
    }

}

const sendMailToCandidateCheckIfRelelevant = async (req, res, next) => {  //כשהמנהל לוחץ על כפתור שליחת מייל למועמד כדי לבדוק אם הוא עדיין רלוונטי

    try {

        const candidateID = req.params.id;
        const candidateExist = await Candidate.findOne({ _id: candidateID })

        if (!candidateExist) {
            return res.status(400).json({ message: "מועמד לא נמצא" });
        }

        else {
            const mailTo = candidateExist.email;
            const textMail = `שלום ${candidateExist.firstName}.\n האם את/ה עדיין מחפש/ת שידוך? השב/י בכן או לא כדי שהמערכת תדע האם להסיר אותך מהמאגר. תודה.`;
            mail.sendMail(mailTo, textMail);

            res.status(200).json({ message: "המייל נשלח למועמד בהצלחה" });
        }
    }

    catch (err) {
        next(err)
    }

}

const removeCandidate = async (req, res, next) => { // הסרת מועמד מהמערכת
    try {
        const candidateID = req.params.id;

        const candidateExist = await Candidate.findOne({ _id: candidateID });

        if (!candidateExist) {
            return res.status(404).json({ message: "מועמד לא נמצא" });
        }

        // הסרת המועמד מאזור אישי של שדכנים שהוא נמצא אצלם
        await Matchmaker.updateMany(
            { candidates: candidateID },
            { $pull: { candidates: candidateID } }
        );

        await Candidate.deleteOne({ _id: candidateID });

        res.status(200).json({ message: "המועמד הוסר בהצלחה מהמערכת" });

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
    deleteMessageFromMatchmaker,
    removingIrrelevantCandidate,
    sendMailToCandidateCheckIfRelelevant,
    removeCandidate
}
