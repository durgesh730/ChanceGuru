const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    pId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    charId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "applied", // when a applicant is applied
        "shortlisted", // when a applicant is shortlisted
        "selected", // when a applicant is selected
        "rejected", // when a applicant is rejected
        "scheduled"
      ],
      default: "applied",
      required: true,
    },
    value: {
      type: Number,
      default: 5
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    updatedAt: {
      type: String,
    },
    audition: {
        date:{
          type: String
        },
        time:{
          type:String
        },
        location:{
          type: String
        },
        interviewer:{
          type: String
        }
    }  
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("JobApplication", schema);
