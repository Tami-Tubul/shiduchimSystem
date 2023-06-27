const express = require('express')
const router = express.Router()

const managerController = require("../controllers/managerControllers");
const usersControllers = require('../controllers/usersControllers');

const { authenticateToken, checkUserRole } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן ופונקציה נוספת שבודקת אם זה המנהל

router.put("/new-matchmakers/:id", authenticateToken, checkUserRole('admin'), managerController.approveMatchmaker);
router.delete("/new-matchmakers/:id", authenticateToken, checkUserRole('admin'), managerController.deleteMatchmaker);
router.put("/new-candidates/:id", authenticateToken, checkUserRole('admin'), managerController.approveCandidate);
router.delete("/new-candidates/:id", authenticateToken, checkUserRole('admin'), managerController.deleteCandidate);
router.get("/matchmakers-cards", authenticateToken, checkUserRole('admin'), managerController.getAllMatchmakersCards);
router.get("/messages", authenticateToken, checkUserRole('admin'), managerController.getAllMassagesFromMatchmakers);
router.delete("/messages/:id", authenticateToken, checkUserRole('admin'), managerController.deleteMessageFromMatchmaker);
router.delete("/remoal-candidates/:id", authenticateToken, checkUserRole('admin'), managerController.removingIrrelevantCandidate);

router.post("/filter-candidates", authenticateToken, checkUserRole('admin'), usersControllers.filterCandidatesCards);
router.get("/candidates-cards", authenticateToken, checkUserRole('admin'), usersControllers.getAllCandidatesCards);

module.exports = router;

