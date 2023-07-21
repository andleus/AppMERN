import express from "express";
import task from "../models/task.js";

const router = express.Router();
const Task = task;

router.get('/', async (req, res) => {
    try{
        // const tasks = await Task.find({});
        const tasks = await Task.find();
        console.log(tasks)
        res.json({
            status: 'IT WORKS!',
            tasks
        });
    }catch(error){
        res.json(`ERROR -> ${error}`);
    }


});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json({
        task
    });
})



router.post('/', async (req, res) => {
    try{  
        const { title, description } = req.body;
        const task = new Task({ title, description }) 
        console.log(req.body);
        console.log(task);
        await task.save();
        res.json({status: `Task saved y tal`});
    }catch(error){
        res.json({error: `${error}`});
    }

});



router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    console.log(req.params.id);
    res.json({status: `This task '${req.params.id}' has been updated `});
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: `This task '${req.params.id}' has been deleted`});
})



export default router;
