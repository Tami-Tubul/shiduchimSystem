const express = require('express')
const router = express.Router()

const matchmakerControllers = require("../controllers/matchmakerControllers");
const usersControllers = require('../controllers/usersControllers');

const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.post("/closing-match", authenticateToken, matchmakerControllers.closingMatch);
router.get("/cart", authenticateToken, matchmakerControllers.getAllCandidateOnCart);
router.delete("/cart/:id", authenticateToken, matchmakerControllers.deleteCandidateFromCart);
router.put("/candidates-cards/:id", authenticateToken, matchmakerControllers.addCandidateToCart); 
router.post("/message", authenticateToken, matchmakerControllers.sendMessageToManager);

router.post("/filter-candidates", authenticateToken, usersControllers.filterCandidatesCards);
router.get("/candidates-cards", authenticateToken, usersControllers.getAllCandidatesCards);


module.exports = router;


