const express = require('express');
const router = express.Router();
const candidatesControllers = require('../controllers/candidatesControllers');


router.post("/register", candidatesControllers.registerCandidate);

module.exports = router; 
