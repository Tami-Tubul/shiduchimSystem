const Matchmaker = require("../models/MatchmakerModel");
const Message = require("../models/MessageModel");
const Meorasim = require("../models/MeorasimModel");
const Candidate = require("../models/CandidateModel");



const markingCandidateForRemoval = async (req, res, next) => { //סימון מועמד להסרה ע"י השדכן. בפועל המנהל מוחק אותו בפונקציית מחיקה שלו

    try {

        const candidateID = req.params.id;

        const candidate = await Candidate.findById(candidateID);

        if (!candidate) {
            return res.status(404).json({ message: "מועמד לא נמצא" })
        }

        if (candidate.pendingDeletion) {
            return res.status(400).json({ message: "מועמד זה כבר סומן למחיקה" });
        }

        await Candidate.findByIdAndUpdate(candidateID, {
            pendingDeletion: true
        })

        res.status(200).json({ message: "המועמד סומן למחיקה" })

    } catch (err) {
        next(err)
    }

}

const closingMatch = async (req, res, next) => { //סגירת שידוך

    try {

        const { bachurId, bachurName, bachuraId, bachuraName, bachurFather, bachuraFather, bachurYeshiva, bachuraSeminar, bachurCity, bachuraCity, dateWort } = req.body;
        if (!(bachurName && bachuraName && bachurFather && bachuraFather && bachurYeshiva && bachuraSeminar && bachurCity && bachuraCity && dateWort)) {
            return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
        }

        const shiduchExist = await Meorasim.findOne({ bachurId: bachurId, bachuraId: bachuraId })
        if (shiduchExist) {
            return res.status(400).json({ message: "שידוך זה כבר קיים בטבלת המאורסים" });
        }

        const newShiduch = new Meorasim({
            bachurId: bachurId,
            bachuraId: bachuraId,
            bachurName: bachurName,
            bachuraName: bachuraName,
            bachurFather: bachurFather,
            bachuraFather: bachuraFather,
            bachurYeshiva: bachurYeshiva,
            bachuraSeminar: bachuraSeminar,
            bachurCity: bachurCity,
            bachuraCity: bachuraCity,
            dateWort: dateWort,
            matchmakerId: req.userConnect.id //השדכן המחובר שעשה את השידוך
        })

        const saveShiduch = await newShiduch.save();  //הוספת שידוך לטבלת מאורסים

        if (saveShiduch) {

            const bachur = await Candidate.findOne({ _id: bachurId });
            const bachura = await Candidate.findOne({ _id: bachuraId });

            if (!bachur || !bachura) {
                return res.status(400).json({ message: "בחור/ה זה/ו לא קיים/מת במאגר המועמדים" })
            }

            const bachurRemoved = await Candidate.deleteOne({ _id: bachur._id }); //מחיקת בחור מטבלת מועמדים

            const bachuraRemoved = await Candidate.deleteOne({ _id: bachura._id }); //מחיקת בחורה מטבלת מועמדים

            //מחיקת בחור ובחורה מהאזור האישי של השדכן
            const matchmakerID = req.userConnect.id;
            const bachurID = bachur._id;
            const bachuraID = bachura._id;
            const matchmakerAfterRemoveCandidate = await Matchmaker.findByIdAndUpdate(
                matchmakerID,
                { $pull: { candidates: { $in: [bachurID, bachuraID] } } }, //מחיקת ID של המאורסים מהשדכן
                { new: true })  //החזרת אובייקט שדכן מעודכן לאחר ההסרה    


            if (!bachurRemoved || !bachuraRemoved) {
                return res.status(500).json({ message: "אירעה תקלה במחיקת הבחור/ה המאורס/ת מטבלת המועמדים" });
            }
            if (!matchmakerAfterRemoveCandidate) {
                return res.status(500).json({ message: "אירעה תקלה במחיקת המאורסים מהסל של השדכן" });
            }

            res.status(201).json({
                message1: "השידוך נוסף בהצלחה למאגר המאורסים",
                message2: "המאורסים הוסרו ממאגר המועמדים",
                message3: "המאורסים הוסרו מהסל של השדכן בהצלחה"
            });
        }
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


const getAllCandidateOnCart = async (req, res, next) => { //שליפת מועמדים מהאזור האישי
    try {
        const matchmakerID = req.userConnect.id;
        const matchmakerExist = await Matchmaker.findOne({ _id: matchmakerID });
        if (!matchmakerExist) {
            return res.status(400).json({ message: "שדכן לא נמצא" });
        }
        const candidatesForMatchmaker = matchmakerExist.candidates;
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
        if (!matchmaker) {
            return res.status(400).json({ message: "שדכן לא נמצא" });
        }
        if (matchmaker.candidates.includes(candidateID)) {
            return res.status(400).json({ message: "מועמד זה כבר קיים בסל שלך" });
        }
        matchmaker.candidates = [...matchmaker.candidates, candidateID];
        matchmaker.save();
        res.status(200).json({ message: "המועמד נוסף לסל בהצלחה", candidatesOnCart: matchmaker.candidates });

    }
    catch (err) {
        next(err)
    }
}



const sendMessageToManager = async (req, res, next) => { //שליחת הודעה למנהל
    try {
        const { nameOfSender, emailofSender, textMessage } = req.body;
        if (!(nameOfSender && emailofSender && textMessage)) {
            return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
        }
        const newMessage = new Message({
            nameOfSender: nameOfSender,
            emailofSender: emailofSender,
            textMessage: textMessage
        })
        await newMessage.save();
        res.status(201).json({ message: "ההודעה נשלחה בהצלחה", newMessage: newMessage })

    }
    catch (err) {
        console.log(err);
        next(err)
    }

}

const getDoneShiduchimOfMatchmaker = async (req, res, next) => { //שליפת כל השידוכים שהשדכן עשה

    try {
        const matchmakerID = req.userConnect.id;
        const allYourShiduchim = await Meorasim.find({ matchmakerId: matchmakerID });
        res.status(200).json({ yourShiduchim: allYourShiduchim });
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
    getDoneShiduchimOfMatchmaker,
    markingCandidateForRemoval
}