const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// go to new todo page
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new todo
router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name 
  const priority = req.body.priority
  const note = req.body.note
  return Todo.create({ name, priority, note, UserId }) 
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

// go to detail of a specific todo
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } }) 
    .then(todo => res.render('detail', { todo: todo.toJSON() })) 
    .catch(error => console.log(error)) 
})

// go to edit page of a specific todo
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.get() }))
    .catch(error => console.log(error))
})

// update detail of a specific todo
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone, priority, note } = req.body
  return Todo.findOne({ where: { id, UserId } }) 
    .then(todo => {
      todo.name = name
      todo.priority = priority
      todo.note = note
      todo.isDone = isDone === 'on'
      return todo.save() 
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete a specific todo
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router