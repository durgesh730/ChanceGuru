const express = require("express");
const jwtAuth = require("../lib/jwtAuth");
const JobApplicant = require("../db/JobApplication");
const router = express.Router();

router.post("/", jwtAuth , (req, res) => {
    const data = req.body;
    const user = req.user ;
    const application = new JobApplicant({
        userId: user._id,
        pId: data.pId,
        roleId: data.roleId,
        charId: data.charId,
        status: data.status,
    })

    application
        .save()
        .then((respnse) => {
            res.json(respnse);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })

})

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
})
module.exports = router;