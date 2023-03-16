const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Project = require("../db/Project");
const JobApplication = require('../db/JobApplication')
const User = require('../db/User');


router.put("/Deleteproject/:id", (req, res) => {
    const { list } = req.body;
    Project.findOneAndUpdate({ _id: req.params.id }, { $set: { roles: list } }, { new: true })
        .then(job => {
            res.json(job);
            console.log(job)
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

// API for search Project by name project name
router.get("/SearchProjectForAdmin", async (req, res) => {
    const keyword = req.query.name
        ? { "basicInfo.name": { $regex: req.query.name, $options: "i" } } //case insensitive
        : {};
    const users = await Project.find(keyword)
    res.send(users);
});

router.put("/Datetime/", async (req, res) => {
    // console.log(req.body)
    try {
        const data = req.body;
        const userData = await Project.findOneAndUpdate({ _id: data._id }, { $set: { DateTime: data.list } }, { new: true });
        res.json({ userData });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

//Get project form project id

router.get("/oneproject/:id", (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(job => {
            res.json(job);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

// API for change status of jobapplication using default _id

router.put("/Select/:_id/:inc", (req, res) => {

    JobApplication.findOne({ _id: req.params._id })
        .then(job => {
            JobApplication.findOneAndUpdate({ _id: req.params._id }, {
                $set: {
                    status: "selected",
                    value: (req.params.inc == 1 || req.params.inc == 3) ? job.value + 5 : job.value + 100,
                    updatedAt: new Date(),
                },
            }, { returnOriginal: false })
                .then((response) => {
                    res.json(response);
                })
                .catch((err) => {
                    res.status(400).json(err);
                })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

// API for change status of jobapplication using userId


router.put("/Shortlist/:_id/:inc", (req, res) => {

    JobApplication.findOne({ _id: req.params._id })
        .then(job => {
            JobApplication.findOneAndUpdate({ _id: req.params._id }, {
                $set: {
                    status: "shortlisted",
                    value: (req.params.inc == 1 || req.params.inc == 3) ? job.value + 100 : job.value + 1000,
                    updatedAt: new Date(),
                },
            }, { returnOriginal: false })
                .then((response) => {
                    res.json(response);
                })
                .catch((err) => {
                    res.status(400).json(err);
                })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

router.put("/Schedule/:_id/:inc", (req, res) => {
    JobApplication.findOne({ _id: req.params._id })
        .then(job => {
            JobApplication.findOneAndUpdate({ _id: req.params._id }, {
                $set: {
                    status: "scheduled",
                    value: job.value == 5 ? job.value + 1000 : job.value + 500,
                    updatedAt: new Date(),
                },
            }, { returnOriginal: false })
                .then((response) => {
                    res.json(response);
                })
                .catch((err) => {
                    res.status(400).json(err);
                })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


// API for change status of jobapplication 

router.put("/Reject/:_id", (req, res) => {
    JobApplication.findOne({ _id: req.params._id })
        .then(job => {
            JobApplication.findOneAndUpdate({ _id: req.params._id }, {
                $set: {
                    status: "rejected",
                    value: (job.value - 1),
                    updatedAt: new Date(),
                },
            }, { returnOriginal: false })
                .then((response) => {
                    res.json(response);
                })
                .catch((err) => {
                    res.status(400).json(err);
                })
        })
        .catch((res) => {
            res.status(400).json(err);
        })
})

router.get("/allProjectsSeekers", jwtAuth, (req, res) => {
    const user = req.user;
    Project.find({ seekerId: user._id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//TO get all the sekers projects for admin Page
router.get("/getProjectForAdmin", (req, res) => {
    Project.find(req.params.id)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

//TO get all the sekers projects 
router.get("/allProjects", jwtAuth, (req, res) => {
    Project.find()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

router.get("/getOnlySeekersProject/:seekerId", (req, res) => {
    let seekerId = req.params.seekerId;
    Project.find({ seekerId: seekerId })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.get("/projectDetails/:_id", (req, res) => {
    Project.find({ _id: req.params._id })
        .then((response) => {

            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.get("/Seekers/:pId", (req, res) => {
    JobApplication.find({ pId: req.params.pId })
        .then((response) => {
            res.json(response);
            // console.log(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


router.get("/UserId/:id", (req, res) => {
    User.find({ _id: req.params.id })
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
    if (user.type === "user") {
        res.status(203).send("User can't add project , you should register as seeker")
        return;
    };
    const project = new Project({
        seekerId: user._id,
        basicInfo: data.basicInfo,
        roles: data.roles,
        createAt: new Date(),
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
    console.log(data.project.roles,data.project._id)
    Project.findOneAndUpdate({ _id: data.project._id }, {
        $set: {
            roles: data.project.roles,
            updateAt: new Date()
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
router.get("/getCharacter/:roleId", (req, res) => {
    let roleId = req.params.roleId;
    Project.find(
        { roles: { $elemMatch: { _id: roleId } } },
        { basicInfo: 1, roles: { $elemMatch: { _id: roleId } } }
    )
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})


module.exports = router;
