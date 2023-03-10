const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const JobApplicant = require("../db/JobApplication");
const JobApplication = require("../db/JobApplication");
const router = express.Router();


// To find from _id
router.get("/DatetimeLocation/:_id", (req, res) => {
  JobApplicant.find({ _id: req.params._id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// To find from CharId
router.get("/JobDetails/:UserId/:id", (req, res) => {
  JobApplicant.find({
    userId: req.params.UserId,
    charId: req.params.id
  }).then((response) => {
    res.json(response);
    console.log(response)
  })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/DateTime/:id", async (req, res) => {
  const { time, date, interview, location } = req.body;
  try {
    const newData = {};
    if (time) {
      newData.time = time;
    }
    if (date) {
      newData.date = date;
    }
    if (time) {
      newData.interviewer = interview;
    }
    if (location) {
      newData.location = location;
    }
    const userData = await JobApplicant.findOneAndUpdate({ _id: req.params.id }, { $push: { audition: newData } }, { new: true });
    res.json({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
}
);

// To find from pid
router.get("/project/:_id", (req, res) => {
  JobApplicant.find({ pId: req.params._id })
    .then((response) => {
      res.json(response);
      console.log(response);
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
