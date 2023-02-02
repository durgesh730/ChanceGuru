const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    basicInfo : [
      {
        name: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        email: {
          type: mongoose.SchemaTypes.Email,
          unique: true,
          lowercase: true,
          required: true,
        },
        phone: {
          type: String,
          validate: {
            validator: function (v) {
              return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
            },
            msg: "Phone number is invalid!",
          },
        },
        facebook: {
          type: String,
          required: true,
        },
        instagram: {
          type: String,
          required: true,
        },
      }
    ],
    roles : [
      {
        role : {
          type : String ,
          required : true 
        },
        characters : [
          {
            name : {
              type : String ,
              required : true 
            },
            gender : {
              type : String ,
              required : true 
            },
            desc : {
              type : String ,
              required : true 
            },
            age : {
              type : Number ,
              required : true 
            }
          }
        ]
      }
    ]
  },
  { collation: { locale: "en" } }
);


module.exports = mongoose.model("Project", schema);
