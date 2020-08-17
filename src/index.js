const express = require('express')
// This require is not assigned to a variable because we only want to execute the script that contains that file
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Automatic parse incoming json to an object
app.use(express.json())

const router = new express.Router()

router.get('/test', (req, res) => {
    res.send('This is from my other router')
})

app.use(router)


app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }catch(e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        
        if(!users){
            return res.status(404).send()
        }
        
        res.send(users)
    }catch(e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        
        if(!user){
            return res.status(404).send()
        }
        
        res.send(user)
    }catch (e) {
        res.status(500).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        
        if(!tasks){
            return res.status(404).send()
        }
        res.send(tasks)
    }catch (e) {
        res.send(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if(!task){
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid operation!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators:true})

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})