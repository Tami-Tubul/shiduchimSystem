const express = require('express')
const router = express.Router()

const managerController = require("../controllers/managerControllers");
const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.put("/approve-matchmaker/:id", authenticateToken, managerController.approveMatchmaker);
router.delete("/delete-matchmaker/:id", authenticateToken, managerController.deleteMatchmaker);
router.get("/", authenticateToken, managerController.getAllNewRegisters);
router.delete("/:id", authenticateToken, managerController.deleteUsers);
router.get("/", authenticateToken, managerController.getAllMassagesFromUsers);
router.get("/", authenticateToken, managerController.getAllMassagesFromMatchmakers);

module.exports = router; 
