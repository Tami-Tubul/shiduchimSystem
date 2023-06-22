const express = require('express')
const router = express.Router()

const managerController = require("../controllers/managerControllers");
const { authenticateToken, checkUserRole } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן ופונקציה נוספת שבודקת אם זה המנהל

router.put("/approve-matchmaker/:id", authenticateToken, checkUserRole('admin'), managerController.approveMatchmaker);
router.delete("/delete-matchmaker/:id", authenticateToken, checkUserRole('admin'), managerController.deleteMatchmaker);
router.put("/approve-candidate/:id", authenticateToken, checkUserRole('admin'), managerController.approveCandidate);
router.delete("/delete-candidate/:id", authenticateToken, checkUserRole('admin'), managerController.deleteCandidate);
router.get("/matchmakers-cards", authenticateToken, checkUserRole('admin'), managerController.getAllMatchmakersCards);
router.get("/messages", authenticateToken, checkUserRole('admin'), managerController.getAllMassagesFromMatchmakers);
router.delete("/:id", authenticateToken, checkUserRole('admin'), managerController.deleteMessagesFromMatchmakers);

module.exports = router;

