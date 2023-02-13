const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        seekerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
     
        talentId: {
            type: String
        },
        RequestSendAt: {
            type: Date,
        }
    }
);

module.exports = mongoose.model("ReqToApp",schema);