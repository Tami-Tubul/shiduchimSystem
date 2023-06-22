const express = require('express');
const router = express.Router();
const commonControllers = require('../controllers/commonControllers');
const { authenticateToken, checkUserRole } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן ופונקציה נוספת שבודקת איזה יוזר זה

router.post("/register-candidate", commonControllers.registerCandidate);
router.post("/filter-candidates", authenticateToken, commonControllers.filterCandidatesCards);
router.get("/meorasim-cards", authenticateToken, commonControllers.getAllDoneShiduchim);
router.get("/candidates-cards", authenticateToken, commonControllers.getAllCandidatesCards);
router.put("/candidates-cards/:id", authenticateToken, checkUserRole('matchmaker'), commonControllers.addCandidateToCart); // רק שדכן יכול להוסיף מועמדים לאזור האישי

module.exports = router; 
