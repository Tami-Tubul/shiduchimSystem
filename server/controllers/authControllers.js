const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

let RSA_PRIVATE_KEY = crypto.randomBytes(64).toString('hex'); //יצירת מפתח אבטחה אקראי

const authLogin = async (req, res, next) => { //התחברות משתמש (מנהל/שדכן)
    try {
        const { userName, password } = req.body;
        const userExist = await User.findOne({ userName: userName, password: password });
        if (!userExist) {
            return res.status(401).json({ message: "משתמש זה לא קיים במערכת. יש לבצע הרשמה" })
        }

        const userID = userExist._id;
        const userRole = userExist.role;
        RSA_PRIVATE_KEY

        const tokenData = jwt.sign(
            { id: userID, role: userRole },
            RSA_PRIVATE_KEY,
        )
        res.status(200).json({ token: tokenData, connectedUser: userExist })

    }

    catch (err) {
        next(err)
    }

}

const authLogout = async (req, res, next) => {
    try {
        RSA_PRIVATE_KEY = crypto.randomBytes(64).toString('hex'); // מפתח אבטחה חדש בהתנתקות
        res.status(200).json({ message: "User disconnected successfully" });
    }
    catch (err) {
        next(err)
    }

}

const authenticateToken = async (req, res, next) => { //בדיקת טוקן  - אם ליוזר שהתחבר יש הרשאת כניסה לאתר 
    let token = req.headers['x-access-token'];

    try {
        if (!token) {
            return res.status(401).json({ message: "No token provided." })
        }
        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).json({ message: "Failed to authenticate token." })
            else {
                req.userRole = decoded.role; //מפענח מהדיקודד את הרול של היוזר שהתחבר ושומר אותו בבקשה
                next();
            }

        })

    }
    catch (err) {
        next(err);
    }
};

const checkUserRole = (role) => (req, res, next) => {  //בדיקת תפקיד היוזר כדי לדעת אילו דפים להציג לו ואיזה לא
    const userRole = req.userRole;
    if (userRole !== role) {
        return res.status(403).json({ message: `Access forbidden. Required role: ${role}` });
    }
    next();
};


module.exports = { authLogin, authLogout, authenticateToken, checkUserRole }