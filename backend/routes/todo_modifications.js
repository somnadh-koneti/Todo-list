const express=require('express');
const router = express.Router();
const { todo } = require('../db');
const zod=require('zod');
const { authMiddleware } = require('../middleware');


const updateTodo=zod.object({
    id: zod.string()
})

const deleteTodo=zod.object({
    id: zod.string()
})

const titledata = zod.object({
    title: zod.string().trim().max(20).min(2),
})


router.post("/val_tdata", async (req, res) => {
    const data=req.body;
    const done = titledata.safeParse(data)
    if (!done.success) 
    {
        return res.json({message: "invalid"})
    }
    return res.json({message: "valid"})

})

router.post("/todoadd",authMiddleware,async (req,res)=>{

    const data=req.body;

    await todo.create({
        title: data.title,
        description: data.description,
        completed: false
    });

    res.json({
        msg: " Todo created."
    });

});

router.get("/todoget",async (req,res)=>{

    const data = await todo.find({});

    res.json({ data });

});

router.put("/todoupdate",authMiddleware,async (req,res)=>{

    const data=req.body;
    const parseId=updateTodo.safeParse(data);
    if(!parseId.success){
        return res.status(411).json({
            msg:"You sent the wrong input"
        });
    }

    await todo.updateOne({_id:data.id},{completed: true})

    res.json({
        msg: "Todo marked as completed."
    });
});



router.delete("/tododelete",authMiddleware,async (req,res)=>{

    const data=req.body;
    const parseId=deleteTodo.safeParse(data);
    if(!parseId.success){
        return res.status(411).json({
            msg:"You sent the wrong input"
        });
    }

    await todo.deleteOne({_id:data.id})

    res.json({
        msg: "Deleted Sucessfully."
    });
});

module.exports = router;
