const Candidate = require("../models/CandidateModel");

//פונקציות משותפות לשדכן ומנהל

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



module.exports = {
    filterCandidatesCards,
    getAllCandidatesCards
    
}