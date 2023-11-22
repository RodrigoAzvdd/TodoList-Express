const express = require('express')

const Checklist = require('../models/checklist')
const Task = require('../models/task')

const simpleRouter = express.Router()
const checklistDepedentRouter = express.Router()

checklistDepedentRouter.get('/:id/tasks/new', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        let task = new Task()
        res.status(200).render('tasks/new', { task: task, checklistId: req.params.id, checklist: checklist })
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao carregar o formulário' })
    }
})

simpleRouter.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id)
        let checklist = await Checklist.findById(task.checklistId)
        let taskToRemove = checklist.tasks.indexOf(task._id)
        checklist.tasks.splice(taskToRemove, 1)
        checklist.save()
        res.redirect(`/checklists/${checklist._id}`)
    } catch (error) {
        res.status(422).render('pages/error', { error: error })
    }
})

simpleRouter.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id)
    try {
        task.set(req.body.task)
        await task.save()
        res.status(200).json({ task })
    } catch (error) {
        let errors = error.errors
        res.status(422).json({ task: { ...errors } })
    }
})

checklistDepedentRouter.post('/:id/tasks', async (req, res) => {
    let { name } = req.body.task
    let task = new Task({ name, checklistId: req.params.id })
    try {
        task.save()
        let checklist = await Checklist.findById(req.params.id)
        checklist.tasks.push(task)
        await checklist.save()
        res.status(200).redirect(`/checklists/${req.params.id}`)
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao adicionar a Tarefa' })
    }
})

module.exports = {
    checklistDepedent: checklistDepedentRouter,
    simple: simpleRouter
}