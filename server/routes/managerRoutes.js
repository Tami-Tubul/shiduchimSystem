const express = require('express')
const router = express.Router()

const managerController = require("../controllers/managerControllers");
const usersControllers = require('../controllers/usersControllers');

const { authenticateToken, checkUserRole } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן ופונקציה נוספת שבודקת אם זה המנהל

router.put("/new-matchmakers/:id", authenticateToken, checkUserRole('manager'), managerController.approveMatchmaker);
router.delete("/new-matchmakers/:id", authenticateToken, checkUserRole('manager'), managerController.deleteMatchmaker);
router.put("/new-candidates/:id", authenticateToken, checkUserRole('manager'), managerController.approveCandidate);
router.delete("/new-candidates/:id", authenticateToken, checkUserRole('manager'), managerController.deleteCandidate);
router.get("/matchmakers-cards", authenticateToken, checkUserRole('manager'), managerController.getAllMatchmakersCards);
router.get("/messages", authenticateToken, checkUserRole('manager'), managerController.getAllMassagesFromMatchmakers);
router.delete("/messages/:id", authenticateToken, checkUserRole('manager'), managerController.deleteMessageFromMatchmaker);
router.delete("/removal-candidates/:id", authenticateToken, checkUserRole('manager'), managerController.removingIrrelevantCandidate);
router.post("/candidates-cards/:id", authenticateToken, checkUserRole('manager'), managerController.sendMailToCandidateCheckIfRelelevant);
router.delete("/candidates-cards/:id", authenticateToken, checkUserRole('manager'), managerController.removeCandidate);

router.post("/filter-candidates", authenticateToken, checkUserRole('manager'), usersControllers.filterCandidatesCards);
router.get("/candidates-cards", authenticateToken, checkUserRole('manager'), usersControllers.getAllCandidatesCards);

module.exports = router;

