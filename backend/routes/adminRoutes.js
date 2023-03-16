const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const router = express.Router();
const Skill = require("../db/Skill");
const RolePref = require("../db/RolePref");

//To get all the skills created by admin 
router.get("/skills", (req, res) => {
    Skill.find()
        .then((skills) => {
            res.json(skills);
        })
        .catch((err) => {
            console.log(err);
        })
})

//To get all the skills created by admin 
router.get("/GetSkillAtadminSide/:id", (req, res) => {
    Skill.find({_id:req.params.id})
        .then((skills) => {
            res.json(skills);
        })
        .catch((err) => {
            console.log(err);
        })
})

//To get all the role preference created by admin 
router.get("/roles", (req, res) => {
    RolePref.find()
        .then((roles) => {
            res.json(roles);
        })
        .catch((err) => {
            console.log(err);
        })
})

//To get all the role preference created by admin 
router.get("/getRolesAtadminSide/:id", (req, res) => {
    RolePref.find({ _id: req.params.id })
        .then((roles) => {
            res.json(roles);
        })
        .catch((err) => {
            console.log(err);
        })
})

//To put the roles to the role table by admin 
router.put("/skills/:skill", (req, res) => {
    const skill = new Skill({
        skill: req.params.skill,
    })
    skill
        .save()
        .then((skill) => {
            res.json(skill);
        })
        .catch((err) => {
            console.log(err);
        })
})

//To put the roles to the role table by admin 
router.put("/roles/:role", (req, res) => {
    const role = new Skill({
        role: req.params.role,
    })
    role
        .save()
        .then((roles) => {
            res.json(roles);
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;
