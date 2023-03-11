const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model("Skill",schema);