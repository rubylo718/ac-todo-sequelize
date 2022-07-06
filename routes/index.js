const express = require('express')
const router = express.Router()

const homeRoute = require('./modules/home')
const usersRoute = require('./modules/users')
const todosRoute = require('./modules/todos')
const authRoute = require('./modules/auth')
const { authCheck } = require('../middleware/authCheck')

router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/todos',authCheck, todosRoute)
router.use('/',authCheck, homeRoute)

module.exports = router
