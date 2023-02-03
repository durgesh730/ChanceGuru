const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Profile = require("../db/Profile")

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

    const user = req.user;
    const profile = new Profile({
        userId: user._id,
        basicInfo: {
            fullname, gender, email, password, DOB, city, state, country,
            address, linkedin, facebook, instagram, userId
        },
        // updatedAt : ISODate(),
    })

    profile
        .save()
        .then((response) => {
            res.json(response);
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
            basicInfo: data.basicInfo,
            updatedAt: ISODate(),
        },
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


//to set talent of user  or change

router.put("/talent", jwtAuth, async (req, res) => {
    const { type, height, weight, bodyType, skinTone, eyeColour, hairColour,
        hairStyle, beardStyle, language, boldScenes, allowances, travelling, } = req.body;
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
        console.log(userData);

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
   const d = {bio:data.bio}

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            portfolio: d,
            // updatedAt: ISODate(),
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


router.put("/portfolio", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
//     console.log(req.body);
//    const d = {bio:data.bio}
   const b = [...bio, {experience:data} ]

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            portfolio: b,
            // updatedAt: ISODate(),
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


//to set photo and video links of user or change

router.put("/photovideo", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            photos: data.photos,
            videos: data.videos,
            updatedAt: ISODate(),
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

router.put("/education", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            education: data.education,
            updatedAt: ISODate(),
        },
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//to set skills of user or change

router.put("/skills", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            skills: data.skills,
            updatedAt: ISODate(),
        },
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//to set role preferences  of user or change

router.put('/rolePref', (req, res) => {
    const data = req.body;
    const user = req.user;

    Profile.findOneAndUpdate({ userId: user._id }, {
        $set: {
            rolePref: data.rolePref,
            updatedAt: ISODate(),
        },
    })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


module.exports = router;