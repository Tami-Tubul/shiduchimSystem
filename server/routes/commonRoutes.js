const express = require('express');
const router = express.Router();
const commonControllers = require('../controllers/commonControllers');

router.post("/register-candidate", commonControllers.registerCandidate);
router.post("/filter-candidates", commonControllers.filterCandidatesCards);
router.get("/candidates-cards", commonControllers.getAllCandidatesCards);
router.get("/meorasim", commonControllers.getAllDoneShiduchim);


module.exports = router; 
