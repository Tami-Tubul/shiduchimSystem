const express = require('express')
const router = express.Router()

const matchmakerControllers = require("../controllers/matchmakerControllers");
const usersControllers = require('../controllers/usersControllers');

const { authenticateToken ,checkUserRole} = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.post("/closing-match", authenticateToken, matchmakerControllers.closingMatch);
router.get("/cart", authenticateToken, matchmakerControllers.getAllCandidateOnCart);
router.delete("/cart/:id", authenticateToken, matchmakerControllers.deleteCandidateFromCart);
router.put("/candidates-cards/:id", authenticateToken, checkUserRole('matchmaker'), matchmakerControllers.addCandidateToCart); // רק שדכן יכול להוסיף מועמדים לאזור האישי
router.post("/message", authenticateToken, matchmakerControllers.sendMessageToManager);

router.post("/filter-candidates", authenticateToken, usersControllers.filterCandidatesCards);
router.get("/candidates-cards", authenticateToken, usersControllers.getAllCandidatesCards);


module.exports = router;


