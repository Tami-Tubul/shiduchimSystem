const express = require('express')
const router = express.Router()

const matchmakerControllers = require("../controllers/matchmakerControllers");
const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.post("/register", matchmakerControllers.registerMatchmaker);
router.post("/closing-match", authenticateToken, matchmakerControllers.closingMatch);
router.get("/cart", authenticateToken, matchmakerControllers.getAllCandidateOnCart);
router.put("/cart/:id", authenticateToken, matchmakerControllers.addCandidateToCart);
router.delete("/cart/:id", authenticateToken, matchmakerControllers.deleteCandidateFromCart);
router.post("/message", authenticateToken, matchmakerControllers.sendMessageToManager);

module.exports = router;


