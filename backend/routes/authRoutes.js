const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const User = require("../db/User");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const bcrypt = require("bcrypt");

//To get the user deatils with the help of email.
router.get("/getuserwithemail/:email" , (req , res) => {
  User.findOne({email : req.params.email})
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
})

//To reset the password of user
router.put("/resetPassword/" , (req, res) => {
  const data = req.body ;
  bcrypt.hash(data.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    User.findOneAndUpdate({email : data.email} ,{ $set : {password : hash}})
    .then((user) => {
      res.json({msg : "Password has been reset successfully"});
    })
    .catch((err) => {
      res.status(400).json(err);
    })
  });
})

//for signup just call post request with all the details in the body
router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    username : data.username ,
    phone: data.phone,
    email: data.email,
    password: data.pass,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


//For login pass email and password through the body it will return token and type of user if exists else it will return user not exists.
router.post("/login", (req, res, next) => {
  // console.log(req.body)
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
       
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

router.get("/" , jwtAuth , (req , res) => {
  const user = req.user;
  User.findOne({_id : user._id})
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
})
router.get("/seeker/:userId", (req , res) => {
  const userId = req.params.userId;
  User.findOne({_id : userId})
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
})

module.exports = router;
