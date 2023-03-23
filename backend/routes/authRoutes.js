const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const User = require("../db/User");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const bcrypt = require("bcrypt");
const RequestToApply = require("../db/RequestToApply")

//To get the user deatils with the help of email.
router.get("/getuserwithemail/:email", (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
})

//To reset the password of user
router.put("/resetPassword/", (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    User.findOneAndUpdate({ email: data.email }, { $set: { password: hash } })
      .then((user) => {
        res.json({ msg: "Password has been reset successfully" });
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
      console.log(err);
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
      newData.link = link;
    }
    const save = await User.findByIdAndUpdate({ _id: user.id },
      { $set: newData }, { new: true })
    res.status(201).json({ status: 201, save });
  } catch (error) {
    res.status(400).json(error);
  }
})


router.put("/markedAsread", jwtAuth, async (req, res) => {
  const user = req.user;
  try {
    const newData = {}
    if (req.body.marked) {
      newData.isMarked = req.body.marked
    }
    const save = await RequestToApply.findOneAndUpdate({ talentId: user._id }, { $set: { isMarked: newData.isMarked } }, { new: true })
    res.status(201).json({ status: 201, save });
  } catch (error) {
    res.status(400).json(error);
  }
})

// ============= API for count on request page on topbar = ======

router.get("/reqcount", jwtAuth, (req, res) => {
  const user = req.user;
  RequestToApply.findOne({ talentId: user._id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
})

router.get("/reqcountAtseekerside", jwtAuth, (req, res) => {
  const user = req.user;
  console.log(user)
  RequestToApply.find({seekerId: user._id })
    .then((data) => {
      res.json(data);
      console.log(data)
    })
    .catch((err) => {
      res.status(400).json(err);
    })
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


router.get("/seeker/:userId", (req, res) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
})


// To get Job applications using seekerId for notification
router.get("/UserImageFromUserTable/:id", (req, res) => {
  User.find({ _id: req.params.id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.get("/allseekerName", async (req, res) => {
  try {
    const note = await User.aggregate([
      {
        $match: { type: "seeker" }
      }
    ])
    res.json(note)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
})

module.exports = router;
