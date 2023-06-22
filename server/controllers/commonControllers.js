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
            drishotFavoriteMoza,
            drishotNotMoza,
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

        if (filteredCandidates) {
            return res.status(200).json({ filteredCandidates: filteredCandidates })
        }

        else {
            return res.status(404).json({ message: "לא נמצאו מועמדים התואמים לסינון שלך" });
        }

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