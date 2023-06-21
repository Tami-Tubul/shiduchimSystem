const express = require('express')
const router = express.Router()

const matchmakerControllers = require("../controllers/matchmakerControllers");
const { authenticateToken } = require('../controllers/authControllers'); // בכל בקשה לשרת מופעלת פונקציה שמאמתת את הטוקן

router.post("/register", matchmakerControllers.registerMatchmaker);
router.get("/", authenticateToken, matchmakerControllers.getAllUsersCards);
router.delete("/:id", authenticateToken, matchmakerControllers.deleteFromCart);
router.post("/", authenticateToken, matchmakerControllers.AddToCart);
router.post("/", authenticateToken, matchmakerControllers.printQuestionPage);
router.post("/", authenticateToken, matchmakerControllers.sendMessageToManager);
router.post("/", authenticateToken, matchmakerControllers.sendLinkOfWebsite);
router.post("/", authenticateToken, matchmakerControllers.sendQuestionPageToManager);

module.exports = router;


