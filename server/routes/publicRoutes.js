const express = require('express');
const router = express.Router();
const publicControllers = require('../controllers/publicControllers');

router.post("/register-candidate", publicControllers.registerCandidate);
router.post("/register-matchmaker", publicControllers.registerMatchmaker);
router.get("/meorasim-cards", publicControllers.getAllDoneShiduchim);


module.exports = router; 
