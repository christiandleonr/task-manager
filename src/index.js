const express = require('express')

// This require is not assigned to a variable because we only want to execute the script that contains that file
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Automatic parse incoming json to an object
app.use(express.json())

// Load the routes for user
app.use(userRouter)

// Load the routes for task
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port', port)
})