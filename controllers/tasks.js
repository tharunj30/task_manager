// REST Api - representation state transfer
const Task = require('../models/task')

const getAllTask = async (req, res) => {
    try {
       const tasks = await Task.find({}) 
       res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
    res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}
const getTask = async (req, res) => {
    try {
        const{id:taskID} = req.params
        const singleTask = await Task.findOne({_id:taskID})
        if(!singleTask){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json(singleTask)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const updateTask = (req, res) => {
    res.send('update task')
}
const deleteTask = (req, res) => {
    res.send('delete task')
}
module.exports = {
    getAllTask, createTask, getTask, updateTask, deleteTask
}