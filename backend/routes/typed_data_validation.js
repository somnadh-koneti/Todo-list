const express = require('express');
const router = express.Router();
const zod = require("zod");
const { todo_signup_data } = require("../db");


const fname = zod.object({
	firstName: zod.string().trim().min(3).max(12).toLowerCase(),
})

const lname = zod.object({
	lastName: zod.string().trim().min(2).max(12).toLowerCase(),
})

const uname = zod.object({
	username: zod.string().email(),
})

const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/;
const pswd = zod.object({
    password: zod.string().min(8).max(32).regex(regexPattern)
});


router.post("/fname", async (req, res) => {
    data={firstName: req.body.firstName}
    const { success } = fname.safeParse(data)
    if (!success) {
        return res.json({
            message: "0",
            value: 'fname'
        })
    }
    return res.status(200).json({
        message: "1",
        value: 'fname'
    })

})

router.post("/lname", async (req, res) => {
    data={lastName: req.body.lastName}
    const { success } = lname.safeParse(data)
    if (!success) {
        return res.json({
            message: "0",
            value: 'lname'
        })
    }
    return res.status(200).json({
        message: "1",
        value: 'lname'
    })

})

router.post("/uname", async (req, res) => {
    data={username: req.body.username}
    const { success } = uname.safeParse(data);
    if (!success) {
        return res.json({
            message: "0",
            value: 'uname'
        })
    }

    const existingUser = await todo_signup_data.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.json({
            message: "2",
            value: 'uname'
        })
    }
    return res.status(200).json({
        message: "1",
        value: 'uname'
    })

})

router.post("/pswd", async (req, res) => {
    data={password: req.body.password}
    const { success } = pswd.safeParse(req.body)
    if (!success) {
        return res.json({
            message: "0",
            value: 'pswd'
        })
    }
    return res.status(200).json({
        message: "1",
        value: 'pswd'
    })

})

module.exports = router;


/*
The password must have:

a minimum of 8 characters and a maximum of 32

must contain 1 uppercase letter

must contain 1 lowercase letter,

must contain 1 number

must contain 1 special character.

    ANS)
        z.string()
        .min(8, 'The password must be at least 8 characters long')
        .max(32, 'The password must be a maximun 32 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A- Za-z\d!@#$%&*-]{8,}$/)
*/