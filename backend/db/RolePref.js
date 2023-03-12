const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model("RolePref",schema);