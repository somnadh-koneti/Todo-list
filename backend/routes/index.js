const express = require('express');
const accountRouter = require("./userinfo");
const data_validation=require("./typed_data_validation");
const todo_data=require("./todo_modifications")

const router = express.Router();

router.use("/userinfo", accountRouter);
router.use("/typed_data_validation", data_validation);
router.use("/typed_todo_data",todo_data);

module.exports = router;

