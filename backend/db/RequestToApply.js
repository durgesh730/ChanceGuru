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
        },
        isRequested: {
            type: Boolean,
            default:false,
        },
        isMarked: {
            type: Boolean,
            default:false,
        }
    }
);

module.exports = mongoose.model("ReqToApp",schema);