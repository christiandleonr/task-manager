const express = require('express')
// This require is not assigned to a variable because we only want to execute the script that contains that file
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const ObjectID = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

// Automatic parse incoming json to an object
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

// Goal: Setup the task reading endpoints
// 1. Create an endpoint for fetching all tasks
// 2. Create an endpoint for ferching a task by its id
// 3. Setup new request in Postman and test your work

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})