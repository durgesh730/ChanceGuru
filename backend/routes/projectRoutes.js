const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Project = require("../db/Project");
const JobApplication = require('../db/JobApplication')
const User = require('../db/User')

//TO get all the projects 
router.get("/allProjects", (req, res) => {
    Project.find()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

router.get("/allProjectsSeekers",jwtAuth,(req, res) => {
    const user = req.user;
    Project.find({ seekerId: user._id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.get("/Seekers/:pId",(req, res) => {
    JobApplication.find({pId: req.params.pId})
        .then((response) => {
            res.json(response);
            // console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.get("/UserId/:id",(req, res) => {
    User.find({_id:req.params.id})
        .then((response) => {
            res.json(response);
            // console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

// router.get("/Seekers", async (req, res) => {
//     //  const id = 
//      console.log(req.body)
//     try {
//         const note = await JobApplication.findone({ pId: req.params.pId });
//         res.json(note)
//         // console.log(note) 
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Some error occured")
//     }
// })

// router.get("/Seekers/:pId", async (req, res) => {

//     const id = pId;
//     console.log(id)

//     try {
//         const note = await JobApplication.aggregate([
//             {
//                 $match: { pId: `${id}` }
//             }
//         ])
//         res.json(note)
//         console.log(note)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Some error occured")
//     }
// })


//To get project for particular seeker 
router.get("/myProjects", jwtAuth, (req, res) => {
    const user = req.user;
    Project.find({ seekerId: user._id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//To get single project through project id 
router.get("/getProject/:id", (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


//To post project or create new project
router.post("/", jwtAuth, (req, res) => {
    const user = req.user;
    const data = req.body;
    if(user.type === "user"){
        res.status(203).send("User can't add project , you should register as seeker")
        return;
    };
    const project = new Project({
        seekerId: user._id,
        basicInfo: data.basicInfo,
        roles : data.roles
    })
    project
        .save()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


//To change roles in project 
router.put("/changeRoles", jwtAuth, (req, res) => {
    const user = req.user;
    const data = req.body;

    Project.findOneAndUpdate({ seekerId: user._id }, {
        $set: {
            roles: data.roles,
        },
    })
})


module.exports = router;
