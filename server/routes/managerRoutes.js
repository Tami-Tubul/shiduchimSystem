const express = require('express')
const router = express.Router()

const managerController = require("../controllers/managerControllers");
const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.put("/approve-matchmaker/:id", authenticateToken, managerController.approveMatchmaker);
router.delete("/delete-matchmaker/:id", authenticateToken, managerController.deleteMatchmaker);
router.put("/approve-candidate/:id", authenticateToken, managerController.approveCandidate);
router.delete("/delete-candidate/:id", authenticateToken, managerController.deleteCandidate);
router.get("/", authenticateToken, managerController.getAllMatchmakers);
router.get("/", authenticateToken, managerController.getAllMassagesFromMatchmakers);
router.delete("/:id", authenticateToken, managerController.deleteMessagesFromMatchmakers);
router.get("/", authenticateToken, managerController.statistikotShiduchim);

module.exports = router;

