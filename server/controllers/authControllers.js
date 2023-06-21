const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authLogin = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const userExist = await User.findOne({ userName: userName, password: password });
        if (!userExist) {
            return res.status(401).json({ message: "משתמש זה לא קיים במערכת. יש לבצע הרשמה" })
        }
        
        else {
            const userID = userExist._id
            const RSA_PRIVATE_KEY = "somekey" //מפתח אבטחה
            const tokenData = jwt.sign(
                { id: userID },
                RSA_PRIVATE_KEY,
            )
            res.status(200).json({ token: tokenData, connectedUser: userExist })

        }
    }
    catch (err) {
        next(err)
    }

}

const authenticateToken = async (req, res, next) => {
    const RSA_PRIVATE_KEY = "somekey";
    let token = req.headers['x-access-token'];

    try {
        if (!token) {
            return res.status(401).json({ message: "No token provided." })
        }

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).json({ message: "Failed to authenticate token." })

            else {
                next();
            }
        })
    }
    catch (err) {
        next(err);
    }
};



module.exports = { authLogin, authenticateToken }