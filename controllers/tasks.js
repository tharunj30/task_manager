// REST Api - representation state transfer
const task = require('../models/task')
const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
// const mongoose = require('mongoose');

const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})
const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findById({ _id: taskID })
    if (!task) {
        return res.status(404).json({ msg: `No task with id : ${taskID}` })
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params
    const delTask = await Task.findOneAndDelete({ _id: taskID })
    if (!delTask) {
        return res.status(404).json({ msg: `No task with id : ${taskID}` })
    }
    res.status(200).json({ delTask })
})
const updateTask = asyncWrapper(async (req, res) => {
    // try {
    //     const { id: taskID } = req.params;

    //     // Check if taskID is a valid ObjectId
    //     if (!mongoose.Types.ObjectId.isValid(taskID)) {
    //         return res.status(400).json({ msg: `Invalid ID: ${taskID}` });
    //     }

    //     const task = await Task.findOneAndUpdate(
    //         { _id: taskID },
    //         req.body,
    //         { new: true, runValidators: true }
    //     );

    //     if (!task) {
    //         return res.status(404).json({ msg: `No task with id: ${taskID}` });
    //     }

    //     res.status(200).json({ task });
    // } catch (error) {
    //     res.status(500).json({ msg: error.message || "Server Error" });
    // }
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate(
        { _id: taskID },
        req.body,
        { new: true, runValidators: true }
    );

    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    // Send the updated task back
    res.status(200).json({ task });

});
module.exports = {
    getAllTask, createTask, getTask, updateTask, deleteTask
}