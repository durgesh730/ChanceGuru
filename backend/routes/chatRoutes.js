const express = require("express");
const {
  accessChat,
  fetchChats,
  updateUnRead,
  incrementChat,
  getUnReadCount,
  reportChat
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/updateUnreadCount").put(protect, updateUnRead);
router.route("/incrChat").put(protect, incrementChat);
router.route("/getUnreadCount").get(protect, getUnReadCount);
router.route("/reportChat").post(protect, reportChat);


module.exports = router;