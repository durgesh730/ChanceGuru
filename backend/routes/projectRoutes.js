const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Project = require("../db/Project");
const JobApplication = require('../db/JobApplication')
const User = require('../db/User');
const { response } = require("express");

// API for change status of jobapplication using default _id

router.put("/Select/:_id", (req, res) => {
    const data = req.body;
    const d =  data.select 

    JobApplication.findOneAndUpdate({_id:req.params._id}, {
        $set: {
             status:d,
        },
    },{returnOriginal : false })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

// API for change status of jobapplication using userId


router.put("/Shortlist/:_id", (req, res) => {
    const data = req.body;
    // console.log(data)
    const d =  data.shortlist 
    // console.log(d)

    JobApplication.findOneAndUpdate({_id:req.params._id}, {
        $set: {
             status:d,
        },
    },{returnOriginal : false })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

router.put("/Schedule/:_id", (req, res) => {
    const data = req.body;
    // console.log(data)
    const d =  data.schedule 
    // console.log(d)

    JobApplication.findOneAndUpdate({_id:req.params._id}, {
        $set: {
             status:d,
        },
    },{returnOriginal : false })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


// API for change status of jobapplication 

router.put("/Reject/:_id", (req, res) => {
    const data = req.body;
    const d =  data.rejected 

    JobApplication.findOneAndUpdate({_id:req.params._id}, {
        $set: {
             status:d,
        },
    },{returnOriginal : false })
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

//TO get all the sekers projects 
router.get("/allProjects", jwtAuth , (req, res) => {
    Project.find()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.get("/projectDetails/:_id",(req, res) => {
    Project.find({_id: req.params._id})
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
    // console.log(data.project.roles,data.project._id)
    Project.findOneAndUpdate({ _id: data.project._id }, {
        $set: {
            roles: data.project.roles,
        },
    })
    .then((response) => {
        res.json(response);

    })
    .catch((err) => {
        // console.log(err)
        res.status(400).json(err);
    })
})



// To get just one character using character Id
router.get("/getCharacter/:roleId",(req,res)=>{
    let roleId = req.params.roleId;
    Project.find(
        { roles : { $elemMatch : { _id:roleId } } },
        { basicInfo:1,roles : { $elemMatch : { _id:roleId } } }
        )
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.status(400).json(err);
    })
})

module.exports = router;
