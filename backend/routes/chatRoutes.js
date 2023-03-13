const express = require("express");
const {
  accessChat,
  fetchChats,
  updateUnRead,
  incrementChat,
  getUnReadCount,
  reportChat,
  blockChat
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/updateUnreadCount").put(protect, updateUnRead);
router.route("/incrChat").put(protect, incrementChat);
router.route("/getUnreadCount").get(protect, getUnReadCount);
router.route("/reportChat").post(protect, reportChat);
router.route("/blockChat").post(protect, blockChat);


module.exports = router;