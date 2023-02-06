const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    seekerId: {
      type: String,
    },
    basicInfo : 
      {
        name: {
          type: String, 
        },
        desc: {
          type: String,
        },
        company: {
          type: String,
        },
        address : {
          type : String ,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        email: {
          type: mongoose.SchemaTypes.Email,
          unique: true,
          lowercase: true,
        },
        phone: {
          type: String,
        },
        facebook: {
          type: String,
        },
        instagram: {
          type: String,
        },
      }
    ,
    roles : [
      {
        role : {
          type : String ,
        },
        characters : [
          {
            name : {
              type : String ,
            },
            gender : {
              type : String ,
            },
            desc : {
              type : String ,
            },
            age : {
              type : Number ,
            }
          }
        ]
      }
    ]
  },
  { collation: { locale: "en" } }
);


module.exports = mongoose.model("Project", schema);
