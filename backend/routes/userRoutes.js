const express = require("express");
const { allUsers } = require("../controllers/userControllers");
const User = require("../db/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);





module.exports = router;