const express = require("express");
const { allMessages, sendMessage, deleteMessages } = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/deleteChat").post(protect, deleteMessages);

module.exports = router;