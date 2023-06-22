const express = require('express')
const router = express.Router()

const managerController = require("../controllers/managerControllers");
const usersControllers = require('../controllers/usersControllers');

const { authenticateToken, checkUserRole } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן ופונקציה נוספת שבודקת אם זה המנהל

router.put("/approve-matchmaker/:id", authenticateToken, checkUserRole('admin'), managerController.approveMatchmaker);
router.delete("/delete-matchmaker/:id", authenticateToken, checkUserRole('admin'), managerController.deleteMatchmaker);
router.put("/approve-candidate/:id", authenticateToken, checkUserRole('admin'), managerController.approveCandidate);
router.delete("/delete-candidate/:id", authenticateToken, checkUserRole('admin'), managerController.deleteCandidate);
router.get("/matchmakers-cards", authenticateToken, checkUserRole('admin'), managerController.getAllMatchmakersCards);
router.get("/messages", authenticateToken, checkUserRole('admin'), managerController.getAllMassagesFromMatchmakers);
router.delete("/messages/:id", authenticateToken, checkUserRole('admin'), managerController.deleteMessageFromMatchmaker);

router.post("/filter-candidates", authenticateToken, usersControllers.filterCandidatesCards);
router.get("/candidates-cards", authenticateToken, usersControllers.getAllCandidatesCards);

module.exports = router;

