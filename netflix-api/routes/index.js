const Router = require('express').Router()
const UserRouter = require('./UserRouter')

// Test
Router.get('/', (req, res) => res.send('This is root babyyyyyyy!'))

Router.use('/user', UserRouter)

module.exports = Router
