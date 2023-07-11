const express = require('express')
const router = express.Router()

const matchmakerControllers = require("../controllers/matchmakerControllers");
const usersControllers = require('../controllers/usersControllers');

const { authenticateToken, checkUserRole } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן ופונקציה נוספת שבודקת אם זה השדכן

router.post("/candidates-cards/:id", authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.markingCandidateForRemoval);
router.post("/closing-match", authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.closingMatch);
router.get("/cart", authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.getAllCandidateOnCart);
router.delete("/cart/:id", authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.deleteCandidateFromCart);
router.put("/candidates-cards/:id", authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.addCandidateToCart);
router.post("/message", authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.sendMessageToManager);
router.get("/your-meorasim-cards",authenticateToken, checkUserRole("matchmaker"), matchmakerControllers.getDoneShiduchimOfMatchmaker);

router.post("/filter-candidates",authenticateToken, checkUserRole("matchmaker"), usersControllers.filterCandidatesCards);
router.get("/candidates-cards", authenticateToken, checkUserRole("matchmaker"), usersControllers.getAllCandidatesCards);


module.exports = router;


