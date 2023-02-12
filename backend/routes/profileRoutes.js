const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Profile = require("../db/Profile")
const User = require("../db/User");
const ReqToApp = require("../db/RequestToApply");
const asyncHandler = require("express-async-handler");
const { response } = require("express");


//to get profile details by user id from user side
router.get("/", jwtAuth, (req, res) => {
    const user = req.user;
    Profile.findOne({ userId: user._id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

// API used for user phone number and email
router.get("/Users", async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $match: { type: "user" }
            }
        ])
        res.json(user)
        // console.log(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// router.get("/ProData", async (req, res) => {
//     const { fullname } = req.query;
//     const basicInfo = {}
//     if(fullname){
//         basicInfo.fullname = fullname;
//     }
//     console.log({ basicInfo})

//     const data = await Profile.find({"basicInfo.fullname":`${fullname}`});
//     res.status(200).json({data})
// })


router.get("/ProData", async (req, res) => {
    const keyword = req.query.fullname
        ?
        { "basicInfo.fullname": { $regex: req.query.fullname, $options: "i" } } //case insensitive

        : {};
    console.log(keyword)
    const users = await Profile.find(keyword);
    res.send(users);
});


// data of profiles 
router.get("/profileData", (req, res) => {
    Profile.find(req.params.id)
        .then((response) => {
            res.json(response);
            // console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//to get profile details by user id from seeker side by providing user id
router.get("/:id", (req, res) => {
    Profile.findOne({ userId: req.params.id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//to create profile of user and setting basic info
router.post("/", jwtAuth, (req, res) => {
    const { fullname, gender, email, password, DOB, city, state,
        country, address, linkedin, facebook, instagram, userId } = req.body;

    const user = req.user ;
    const profile = new Profile({
        userId: user._id,
        basicInfo: {
            fullname, gender, email, password, DOB, city, state, country,
            address, linkedin, facebook, instagram, userId
        },
        updatedAt : new Date(),
    })
    profile
        .save()
        .then((response) => {
            res.json(response);
            console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//to get profile id of user from seeker side

//to post request of request to apply with talent,seeker and apply id  
router.post('/ReqToApp',jwtAuth,(req,res) => {
    const user = req.user ;
    const {talentId} = req.body;
    
    const newData = new ReqToApp({
        
        seekerId: user._id,
        talentId: talentId,
        RequestSendAt : new Date(),
    })
    newData
    .save()
    .then((response) => {
        res.json(response);
        console.log(response);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})

//To change the basicinfo of user

router.put("/basicinfo", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            basicInfo: data,
            updatedAt: new Date(),
        },
    })
        .then((response) => {
            res.json(response);
            console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


//to set talent of user  or change

router.put("/talent", jwtAuth, async (req, res) => {
    const { type, height, weight, bodyType, skinTone, eyeColour,
        hairColour, hairStyle, beardStyle, language, boldScenes,
        allowances, travelling, } = req.body;
    const user = req.user;
    try {
        const newData = {};
        if (type) { newData.type = type };
        if (height) { newData.height = height };
        if (weight) { newData.weight = weight };
        if (bodyType) { newData.bodyType = bodyType };
        if (skinTone) { newData.skinTone = skinTone }
        if (eyeColour) { newData.eyeColour = eyeColour }
        if (hairColour) { newData.hairColour = hairColour }
        if (hairStyle) { newData.eyeColour = hairStyle }
        if (beardStyle) { newData.beardStyle = beardStyle }
        if (language) { newData.language = language }
        if (boldScenes) { newData.boldScenes = boldScenes }
        if (allowances) { newData.allowances = allowances }
        if (travelling) { newData.travelling = travelling }

        const userData = await Profile.findOneAndUpdate({ userId: user._id },
            { $set: { talent: newData } }, { new: true })

        res.json({ userData });
        // console.log(userData);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//to set portfolio of user or change

router.put("/portfolio", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
    console.log(req.body);
    const d = { bio: data.bio }

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            portfolio: d,
            updatedAt: new Date(),
        },
    })
        .then((response) => {
            res.json(response);
            // console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.put("/portfolio/exp", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;

    const d = {}
    Profile.findOne({ userId: user._id })
        .then((r) => {
            // console.log(r.portfolio.bio);
            d.bio = r.portfolio.bio;
            d.experience = data;

            Profile.findOneAndUpdate({ userId: user._id }, {
                $set: {
                    portfolio: d,
                    updatedAt: new Date(),
                },
            })
                .then((response) => {
                    res.json(response);
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })

        })

})

//to set photo and video links of user or change

router.put("/photo", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
    const p = { link: data.photo1 }
    console.log(data)
    console.log(p)

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            photos: p,
            // updatedAt: new Date(),
        },
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.put("/video", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
    const p = { link: data.youtube }
    console.log(req.body)
    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            videos: p,
            // updatedAt: new Date(),
        },
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


//to set education of user or change

router.put("/education", jwtAuth, async (req, res) => {
    const { college, schoolYear, collegeYear, course } = req.body;
    console.log(req.body)
    const user = req.user;
    try {
        const newData = {};
        if (college) { newData.college = college };
        if (schoolYear) { newData.startYear = schoolYear };
        if (collegeYear) { newData.endYear = collegeYear };
        if (course) { newData.degree = course };
        console.log(newData)

        const userData = await Profile.findOneAndUpdate({ userId: user._id },
            { $set: { education: newData } }, { new: true })

        res.json({ userData });
        console.log(userData);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//to set skills of user or change

router.put("/skills", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
    const p = { skill: data.addSkills }

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            skills: p,
            // updatedAt: new Date(),
        },
    })
        .then((response) => {
            res.json(response);
            console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//to set role preferences  of user or change

router.put('/rolePref', jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
    console.log(data)
    const p = { role: data.roles }
    console.log(p)

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            rolePref: p,
            updatedAt: new Date(),
        },
    })
        .then((response) => {
            res.json(response);
            console.log(response)

        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


//seeker API 
router.get("/seaker", jwtAuth, (req, res) => {
    // const user = req.user;
    Profile.find(req.params.id)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


module.exports = router;