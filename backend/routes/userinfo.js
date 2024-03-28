const express = require('express');
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcryptjs');


const { todo_signup_data } = require("../db");

let setflag=0;

// --------------------signup-----------

router.post("/signup", async (req, res) => {

    const pass = await bcrypt.hash(req.body.password, 10);

    await todo_signup_data.create({
        username: req.body.username,
        password: pass,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    res.json({
        message: "VALID-DONE",
    })
})

// ---------------------signin---------------------

const signinBody = zod.object({
    username: zod.string().email().trim(),
	password: zod.string(),
    flag:zod.number()
})


router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.json({
            message: "Incorrect inputs.",
        })
    }

    const user = await todo_signup_data.findOne({username: req.body.username});

    if(!user){res.json({
        message: "Invalid username/password.",
    })} 

    const pass= await bcrypt.compare(req.body.password, user.password);

    if (pass) {
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        setflag = req.body.flag;
        return res.json({
            message: 'VALID-DONE',
            token: token,
        })
    }
    res.json({
        message: "Invalid username/password.",
    })
})

// -------------logout----------------

const logoutBody = zod.object({
    flag:zod.number()
})

router.post("/logout",async(req,res)=>{
    const { success } = logoutBody.safeParse(req.body)
    if (!success) {
        return res.json({
            message: "Invalid"
        })
    }

    setflag=req.body.flag;

    return res.json({message: "valid"})
})

// ------------------authenticated------------------

router.get("/isAuthenticated",async (req,res)=>{
    return res.json({setflag : setflag });

});

module.exports = router;