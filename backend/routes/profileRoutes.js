const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Profile = require("../db/Profile");
const User = require("../db/User");
const ReqToApp = require("../db/RequestToApply");
const asyncHandler = require("express-async-handler");
const { response } = require("express");
const Project = require("../db/Project");


//to get profile details by user id from user side
router.get("/", jwtAuth, (req, res) => {
  const user = req.user;
  Profile.findOne({ userId: user._id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// API used for user seeker image
router.get("/seekersImage/:id", async (req, res) => {
  try {
    const user = await User.findOne({_id:req.params.id})
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// API used for user phone number and email
router.get("/Users/:id", async (req, res) => {
  try {
    const user = await User.findOne({_id:req.params.id})
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// API for search data on browser Profile by fullname {"rolePref.role":"Main Role Hero"}
router.get("/SelectData", async (req, res) => {
    // console.log(req.query.role.select)
    const keyword = req.query.role
        ?
        { "rolePref.role": { $regex: req.query.role, $options: "i" } } //case insensitive

        : {};
    const users = await Profile.find(keyword);
    res.send(users);
});


// API for search data on browser Profile by fullname
router.get("/ProData", async (req, res) => {
  const keyword = req.query.fullname
    ? { "basicInfo.fullname": { $regex: req.query.fullname, $options: "i" } } //case insensitive
    : {};
  const users = await Profile.find(keyword);
  res.send(users);
});

// API for search data on seeker dashboard by name
router.get("/searchSeekerData", jwtAuth, async (req, res) => {
  const user = req.user;
  const keyword = req.query.name
    ? { "basicInfo.name": { $regex: req.query.name, $options: "i" } } //case insensitive
    : {};
  const users = await Project.find(keyword).find({ seekerId: user._id });
  res.send(users);
});

// API for search data on talent dashboard by fullname
router.get("/searchData", async (req, res) => {
  const keyword = req.query.name
    ? { "basicInfo.name": { $regex: req.query.name, $options: "i" } } //case insensitive
    : {};
  const users = await Project.find(keyword);
  res.send(users);
});

// data of profiles
router.get("/profileData", (req, res) => {
  Profile.find(req.query.id?{userId:req.query.id}:{})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to get profile details by user id from seeker side by providing user id
router.get("/:id", (req, res) => {
  Profile.findOne({ userId: req.params.id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to create profile of user and setting basic info
router.post("/", jwtAuth, (req, res) => {
  const {
    fullname,
    gender,
    email,
    password,
    DOB,
    city,
    state,
    country,
    address,
    linkedin,
    facebook,
    instagram,
    userId,
  } = req.body;

  const user = req.user;
  const profile = new Profile({
    userId: user._id,
    basicInfo: {
      fullname,
      gender,
      email,
      password,
      DOB,
      city,
      state,
      country,
      address,
      linkedin,
      facebook,
      instagram,
      userId,
    },
    updatedAt: new Date(),
  });
  profile
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to get profile id of user from seeker side


//to put request of request to apply with talent,seeker and apply id
router.put("/ReqToApp", jwtAuth, (req, res) => {
  const user = req.user;
  const { talentId } = req.body;

  ReqToApp.findOneAndUpdate(
    {
      seekerId: user._id,
      talentId: talentId,
    },
    {
      $set: {
        isRequested: true,
        RequestSendAt: new Date(),
      },
    }
  )
    .then((response) => {
      console.log(response)
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// To post profile view in reqToApp with default configuration isRequested:false
router.post("/ReqToApp", jwtAuth, (req, res) => {
  const user = req.user;
  const { talentId } = req.body;

  const newData = new ReqToApp({
    seekerId: user._id,
    talentId: talentId,
  });
  newData
    .save()
    .then((response) => {
        res.json(response);
        // console.log(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// To get view profiles for talent notification
router.get("/reqToApp/:userId",(req,res)=>{
  let userId = req.params.userId;
  ReqToApp.find({talentId:userId})
  .then((response)=>{
    res.json(response)
  })
  .catch((err)=>{
    res.status(400).json(err)
  })
})

// To get requests
router.get("/getRequests/:userId",(req,res)=>{
  let userId = req.params.userId;
  ReqToApp.find({talentId:userId,isRequested:true})
  .then((response)=>{
    res.json(response)
  })
  .catch((err)=>{
    res.status(400).json(err)
  })
})

//To change the basicinfo of user

router.put("/basicinfo", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;

  Profile.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        basicInfo: data,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// To change the basicinfo of user by put req at admin side

router.put("/basicinfoAdmin/:id", (req, res) => {
  const data = req.body;
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        basicInfo: data,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


//to set talent of user  or change
router.put("/talent", jwtAuth, async (req, res) => {
  const {
    type,
    height,
    weight,
    bodyType,
    skinTone,
    eyeColour,
    hairColour,
    hairStyle,
    beardStyle,
    language,
    boldScenes,
    allowances,
    travelling,
  } = req.body;
  const user = req.user;
  try {
    const newData = {};
    if (type) {
      newData.type = type;
    }
    if (height) {
      newData.height = height;
    }
    if (weight) {
      newData.weight = weight;
    }
    if (bodyType) {
      newData.bodyType = bodyType;
    }
    if (skinTone) {
      newData.skinTone = skinTone;
    }
    if (eyeColour) {
      newData.eyeColour = eyeColour;
    }
    if (hairColour) {
      newData.hairColour = hairColour;
    }
    if (hairStyle) {
      newData.eyeColour = hairStyle;
    }
    if (beardStyle) {
      newData.beardStyle = beardStyle;
    }
    if (language) {
      newData.language = language;
    }
    if (boldScenes) {
      newData.boldScenes = boldScenes;
    }
    if (allowances) {
      newData.allowances = allowances;
    }
    if (travelling) {
      newData.travelling = travelling;
    }

    const userData = await Profile.findOneAndUpdate(
      { userId: user._id },
      { $set: { talent: newData } },
      { new: true }
    );

    res.json({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});


//to set talent of user  or change by admin side 
router.put("/editTalentAtAdmin/:id", async (req, res) => {
  const {
    type,
    height,
    weight,
    bodyType,
    skinTone,
    eyeColour,
    hairColour,
    hairStyle,
    beardStyle,
    language,
    boldScenes,
    allowances,
    travelling,
  } = req.body;

  try {
    const newData = {};
    if (type) {
      newData.type = type;
    }
    if (height) {
      newData.height = height;
    }
    if (weight) {
      newData.weight = weight;
    }
    if (bodyType) {
      newData.bodyType = bodyType;
    }
    if (skinTone) {
      newData.skinTone = skinTone;
    }
    if (eyeColour) {
      newData.eyeColour = eyeColour;
    }
    if (hairColour) {
      newData.hairColour = hairColour;
    }
    if (hairStyle) {
      newData.eyeColour = hairStyle;
    }
    if (beardStyle) {
      newData.beardStyle = beardStyle;
    }
    if (language) {
      newData.language = language;
    }
    if (boldScenes) {
      newData.boldScenes = boldScenes;
    }
    if (allowances) {
      newData.allowances = allowances;
    }
    if (travelling) {
      newData.travelling = travelling;
    }

    const userData = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { talent: newData } },
      { new: true }
    );

    res.json({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//to set portfolio of user or change

router.put("/portfolio", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;
  const d = { bio: data.bio };

  Profile.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        portfolio: d,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


//to set portfolio of user or change admin side

router.put("/AdminSideportfolio/:id", (req, res) => {
  const data = req.body;
  const d = { bio: data.bio };
  Profile.findOneAndUpdate(
    { _id: req.params.id},
    {
      $set: {
        portfolio: d,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.put("/portfolio/Adminexp/:id", (req, res) => {
  const data = req.body;
  const d = {};
  Profile.findOne({ _id:req.params.id }).then((r) => {
    d.bio = r.portfolio.bio;
    d.experience = data;
    Profile.findOneAndUpdate(
      { _id:req.params.id },
      {
        $set: {
          portfolio: d,
          updatedAt: new Date(),
        },
      }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.put("/portfolio/exp", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;
  const d = {};
  Profile.findOne({ userId: user._id }).then((r) => {
    d.bio = r.portfolio.bio;
    d.experience = data;
    console.log(d)
    Profile.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          portfolio: d,
          updatedAt: new Date(),
        },
      }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

//to set photo and video links of user or change

router.put("/photo", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;
  Profile.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        photos: data.photoURL,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/AdminSidephoto/:id", (req, res) => {
  const data = req.body;
  Profile.findOneAndUpdate(
    { _id:req.params.id },
    {
      $set: {
        photos: data.photoURL,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/video", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;
  Profile.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        videos: data,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/AdminSidevideo/:id", (req, res) => {
  const data = req.body;
  Profile.findOneAndUpdate(
    { _id:req.params.id },
    {
      $set: {
        videos: data,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to set education of user or change

router.put("/education", jwtAuth, async (req, res) => {
  const { college, schoolYear, collegeYear, course } = req.body;
  const user = req.user;
  try {
    const newData = {};
    if (college) {
      newData.college = college;
    }
    if (schoolYear) {
      newData.startYear = schoolYear;
    }
    if (collegeYear) {
      newData.endYear = collegeYear;
    }
    if (course) {
      newData.degree = course;
    }

    const userData = await Profile.findOneAndUpdate(
      { userId: user._id },
      { $set: { education: newData } },
      { new: true }
    );

    res.json({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});


router.put("/AdminSideEducation/:id", async (req, res) => {
  const { college, schoolYear, collegeYear, course } = req.body;
  try {
    const newData = {};
    if (college) {
      newData.college = college;
    }
    if (schoolYear) {
      newData.startYear = schoolYear;
    }
    if (collegeYear) {
      newData.endYear = collegeYear;
    }
    if (course) {
      newData.degree = course;
    }
    const userData = await Profile.findOneAndUpdate(
      { _id:req.params.id },
      { $set: { education: newData } },
      { new: true }
    );
    res.json({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//to set skills of user or change

router.put("/skills", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;

  Profile.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        skills: data.skills,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to set skills of user or change

router.put("/AdminSideskills/:id", (req, res) => {
  const data = req.body;
  Profile.findOneAndUpdate(
    { _id:req.params.id },
    {
      $set: {
        skills: data.skills,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to set role preferences  of user or change

router.put("/rolePref", jwtAuth, (req, res) => {
  const data = req.body;
  const user = req.user;
  console.log(data.formFields)
  Profile.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        rolePref: data.formFields,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/AdminSiderolePref/:id", (req, res) => {
  const data = req.body;
  Profile.findOneAndUpdate(
    { _id:req.params.id },
    {
      $set: {
        rolePref: data.formFields,
        updatedAt: new Date(),
      },
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//seeker API
router.get("/seaker", jwtAuth, (req, res) => {
  // const user = req.user;
  Profile.find(req.params.id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
