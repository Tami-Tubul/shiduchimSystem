const express = require('express')
const router = express.Router()

const matchmakerControllers = require("../controllers/matchmakerControllers");
const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.post("/register", matchmakerControllers.registerMatchmaker);
router.post("/", authenticateToken, matchmakerControllers.closingMatch);
router.put("/:id", authenticateToken, matchmakerControllers.addCandidateToCart);
router.delete("/:id", authenticateToken, matchmakerControllers.deleteCandidateFromCart);
router.post("/", authenticateToken, matchmakerControllers.sendMessageToManager);

module.exports = router;


