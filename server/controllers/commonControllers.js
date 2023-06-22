const Candidate = require("../models/CandidateModel");
const Matchmaker = require("../models/MatchmakerModel");
const Meorasim = require("../models/MeorasimModel");



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

const getAllDoneShiduchim = async (req, res, next) => { //שליפת כל השידוכים של האתר (משמש גם להצגת הנתונים בגרף סטטיסטיקות) 
    try {
        const allMeorasim = await Meorasim.find({})
        return res.status(200).json({ meorasim: allMeorasim });
    }
    catch (err) {
        next(err)
    }

}


const filterCandidatesCards = async (req, res, next) => {  //סינון מועמדים (שדכן ומנהל)
    try {
        const {
            sector,
            fromAge,
            mostAge,
            economicCondition, // מעמד הכוונה מצב כלכלי?
            fromHigh,
            mostHigh,
            look,
            colorSkin,
            countryBirth,
            drishotFavoriteMoza, //מוצא בחור הכוונה לעידה? אין לו שדה מוצא..
            drishotNotMoza, //מוצא בחור הכוונה לעידה? אין לו שדה מוצא..
            city,
            characters,
            drishotHeaddress,
            healthCondition,
            halachaMethod
        } = req.body

        const query = {}

        if (sector) {
            query.sector = sector
        }

        if (fromAge || mostAge) {
            query.age = {};

            if (fromAge) {
                query.age.$gte = fromAge;
            }

            if (mostAge) {
                query.age.$lte = mostAge;
            }
        }

        if (economicCondition) {
            query.economicCondition = economicCondition
        }

        if (fromHigh) {
            query.height = { $gte: fromHigh }
        }

        if (mostHigh) {
            query.height = { $lte: mostHigh }
        }

        if (look) {
            query.look = look
        }

        if (colorSkin) {
            query.colorSkin = colorSkin
        }

        if (countryBirth) {
            query.countryBirth = countryBirth
        }

        if (drishotFavoriteMoza) {
            query.origin = drishotFavoriteMoza
        }

        if (drishotNotMoza) {
            query.origin = { $ne: drishotNotMoza }
        }

        if (city) {
            query.city = city
        }

        if (characters && characters.length > 0) {
            query.characters = { $all: characters }
        }

        if (drishotHeaddress) {
            query.drishotHeaddress = drishotHeaddress
        }

        if (healthCondition) {
            query.healthCondition = healthCondition
        }

        if (halachaMethod) {
            query.halachaMethod = halachaMethod
        }

        const filteredCandidates = await Candidate.find(query);

        return res.status(200).json({ filteredCandidates: filteredCandidates })

    }
    catch (err) {
        next(err)
    }

}

const getAllCandidatesCards = async (req, res, next) => {  //הצגת כרטיסי מועמדים (שדכן ומנהל)
    try {
        const allCandidates = await Candidate.find({})
        return res.status(200).json({ candidates: allCandidates });
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

module.exports = {
    registerCandidate,
    getAllDoneShiduchim,
    filterCandidatesCards,
    getAllCandidatesCards,
    addCandidateToCart
}