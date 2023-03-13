const mongoose = require("mongoose");

const report = mongoose.Schema({
  reportee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reported: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
});

const ChatReport = mongoose.model("ChatReport", report);

module.exports = ChatReport;
