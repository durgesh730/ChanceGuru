const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const User = require("../db/User");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();

//for signup just call post request with all the details in the body
router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    username: data.username,
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

router.put("/ResetLoggedUserData/:id", jwtAuth, async (req, res) => {
  const user = req.user;
  const { email, username, phone, link } = req.body;
  // console.log(req.body)
  try {
    const newData = {}
    if (username) {
      newData.username = username.value
    }
    if (email) {
      newData.email = email.value
    }
    if (phone) {
      newData.phone = phone.value
    }
    if (link) {
      newData.link = link.link;
    }
    const save = await User.findByIdAndUpdate({ _id: user.id },
      { $set: newData }, { new: true })
    res.status(201).json({ status: 201, save });
  } catch (error) {
    res.status(400).json(error);
  }
})


router.get("/", jwtAuth, (req, res) => {
  const user = req.user;
  User.findOne({ _id: user._id })
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
