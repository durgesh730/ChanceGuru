const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const JobApplicant = require("../db/JobApplication");
const JobApplication = require("../db/JobApplication");
const router = express.Router();

// To find from pid
router.get("/project/:_id", (req, res) => {
  JobApplicant.find({ pId: req.params._id })
    .then((response) => {
      res.json(response);
      // console.log(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//To generate application
router.post("/", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;
  const application = new JobApplicant({
    userId: user._id,
    pId: data.pId,
    roleId: data.roleId,
    charId: data.charId,
    status: data.status,
    seekerId: data.seekerId,
  });

  application
    .save()
    .then((respnse) => {
      res.json(respnse);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//To update status of the application
router.put("/updateStatus", (req, res) => {
  const data = req.body;
  Application.findOneAndUpdate(
    {
      userId: data.userId,
    },
    {
      $set: {
        status: data.status,
      },
    }
  )
    .then((response) => {
      console.log(response);
      res.json({
        message: `Application ${data.status} successfully`,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// To get Job applications using seekerId for notification
router.get("/allJobsSeeker", jwtAuth, (req, res) => {
  const user = req.user;
  console.log(user._id);
  JobApplicant.find({ seekerId: user._id })
    .then((response) => {
      //   console.log(response);
      res.json(response);
    })
    .catch((err) => {
      //   console.log(err);
      res.status(400).json(err);
    });
});

// To get Job applications using userId for notification
router.get("/allJobsUser", jwtAuth, (req, res) => {
  const user = req.user;
  JobApplicant.find({ userId: user._id })
    .then((response) => {
        // console.log(response);
      res.json(response);
    })
    .catch((err) => {
      //   console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
