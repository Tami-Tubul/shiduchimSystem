const express = require('express');
const router = express.Router();
const commonControllers = require('../controllers/commonControllers');
const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.post("/register-candidate", commonControllers.registerCandidate);
router.post("/filter-candidates", authenticateToken, commonControllers.filterCandidatesCards);
router.get("/meorasim-cards", authenticateToken, commonControllers.getAllDoneShiduchim);
router.get("/candidates-cards", commonControllers.getAllCandidatesCards);


module.exports = router; 
