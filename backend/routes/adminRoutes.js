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
    Skill.find({ _id: req.params.id })
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

router.delete("/rolesdelete/:id", (req, res) => {
    RolePref.findByIdAndDelete({ _id: req.params.id })
        .then((roles) => {
            res.json(roles);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.delete("/skilldelete/:id", (req, res) => {
    Skill.findByIdAndDelete({ _id: req.params.id })
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
router.put("/savedRole/:id", async (req, res) => {
    const { role } = req.body;
    try {
        const edit = {};
        if (role) { edit.role = role };
        const data = await RolePref.findByIdAndUpdate({ _id: req.params.id }, { $set: edit }, { new: true });
        res.status(201).send({ data });
    } catch (error) {
        res.status(404).send({ msg: "some error occured" })
    }
})

// /To put the roles to the role table by admin 
router.put("/savedSkills/:id", async (req, res) => {
    const { skill } = req.body;
    try {
        const edit = {};
        if (skill) { edit.skill = skill };
        const data = await Skill.findByIdAndUpdate({ _id: req.params.id }, { $set: edit }, { new: true });
        res.status(201).send({ data });
    } catch (error) {
        res.status(404).send({ msg: "some error occured" })
    }
})


router.post('/addroles',  async (req, res) => {
    const {newRoles} = req.body;
    try {
        const note = new RolePref({role:newRoles })
        const saved = await note.save()
        res.status(201).json({ status: 201, saved })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.post('/addskill',  async (req, res) => {
    const {newRoles} = req.body;
    try {
        const note = new Skill({skill:newRoles })
        const saved = await note.save()
        res.status(201).json({ status: 201, saved })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
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
