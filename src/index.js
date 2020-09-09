require('./db/mongoose')
const express = require('express')
const https = require('https')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

https.createServer({
    key: process.env.KEY,
    cert: process.env.CERT
}, app).listen(port)