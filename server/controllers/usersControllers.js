const Candidate = require("../models/CandidateModel");

//פונקציות משותפות לשדכן ומנהל

const filterCandidatesCards = async (req, res, next) => {  //סינון מועמדים
    try {
        const {
            sector,
            fromAge,
            mostAge,
            doingToday,
            fromHeight,
            mostHeight,
            look,
            colorSkin,
            countryBirth,
            drishotFavoriteMoza,
            drishotNotMoza,
            city,
            characters,
            headdress,
            healthCondition,
            halachaMethod
        } = req.body

        const query = {}

        if (sector && sector !== "") {
            query.sector = sector
        }

        if (fromAge && fromAge !== "" || mostAge && mostAge !== "") {
            query.age = {};

            if (fromAge && fromAge !== "") {
                query.age.$gte = parseInt(fromAge);
            }

            if (mostAge && mostAge !== "") {
                query.age.$lte = parseInt(mostAge);
            }
        }

        if (doingToday && doingToday !== "") {
            query.doingToday = doingToday
        }

        if (fromHeight && fromHeight !== "" && mostHeight && mostHeight !== "") {
            query.height = { $gte: parseFloat(fromHeight), $lte: parseFloat(mostHeight) };
        } else {
            if (fromHeight && fromHeight !== "") {
                query.height = { $gte: parseFloat(fromHeight) };
            }

            if (mostHeight && mostHeight !== "") {
                query.height = { $lte: parseFloat(mostHeight) };
            }
        }

        if (look && look !== "") {
            const lookArray = look.split(/[ ,]+/).map((word) => new RegExp(word, "i"));
            query.look = { $all: lookArray };
        }

        if (colorSkin && colorSkin !== "") {
            query.colorSkin = colorSkin
        }

        if (countryBirth && countryBirth !== "") {
            query.countryBirth = countryBirth
        }

        if (drishotFavoriteMoza && drishotFavoriteMoza !== "") {
            query.origin = drishotFavoriteMoza
        }

        if (drishotNotMoza && drishotNotMoza !== "") {
            query.origin = { $ne: drishotNotMoza }
        }

        if (city && city !== "") {
            query.city = city
        }

        if (characters && characters !== "") {
            const charactersArray = characters.split(/[ ,]+/).map((character) => new RegExp(character, "i"));
            query.characters = { $all: charactersArray };
        }

        if (headdress && headdress !== "") {
            query.headdress = headdress
        }

        if (healthCondition && healthCondition !== "") {
            query.healthCondition = healthCondition
        }

        if (halachaMethod && halachaMethod !== "") {
            query.halachaMethod = halachaMethod
        }

        query.isApproved = true; // יציג רק מועמדים שאושרו ונמצאים כבר במערכת


        const filteredCandidates = await Candidate.find(query);
        return res.status(200).json({ filteredCandidates: filteredCandidates })

    }
    catch (err) {
        next(err)
    }

}

const getAllCandidatesCards = async (req, res, next) => {  //הצגת כרטיסי מועמדים
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