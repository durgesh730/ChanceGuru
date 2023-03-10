const express = require("express");
const {
  accessChat,
  fetchChats,
  updateUnRead,
  getUnReadCount
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/updateUnreadCount").put(protect, updateUnRead);
router.route("/getUnreadCount").get(protect, getUnReadCount);


module.exports = router;