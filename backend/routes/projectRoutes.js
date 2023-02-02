const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Project = require("../db/Project");
const { response } = require("express");

//TO get all the projects 
router.get("/allProjects" , (req , res) => {
    Project.find()
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})

//To get project for particular seeker 
router.get("/myProjects" , jwtAuth , (req , res) => {
    const user = req.user ;
    Project.find({seekerId : user._id})
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})

//To get single project through project id 
router.get("/getProject/:id" , (req, res) =>{
    Project.findOne({_id : req.params.id})
    .then((response) => {
        res.json(response);
    })
    .catch((err) =>{
        res.status(400).json(err);
    })
})


//To post project or create new project
router.post("/" , jwtAuth , (req , res) => {
    const user = req.user ;
    const data = req.body ;

    const project = new Project({
        seelerId : user._id ,
        basicInfo : data.basicInfo ,
        roles : data.roles 
    })
    .save()
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})


//To change roles in project 
router.put("/changeRoles" , jwtAuth , (req ,res) => {
    const user = req.user ;
    const data = req.body ;

    Project.findOneAndUpdate({seekerId : user._id} , {
        $set: {
            roles : data.roles ,
        },
    })
})


module.exports = router;