const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');


router.post("/login", authControllers.authLogin);
router.post("/logout", authControllers.authLogout);

module.exports = router; 
