require('./db/mongoose')
const express = require('express')
const https = require('http')
const fs = require('fs')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const credentials = {key:fs.readFileSync(process.env.KEY), cert:fs.readFileSync(process.env.CERT)}
const port = process.env.PORT

const app = express.createServer(credentials)

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

https.createServer({
    key: fs.readFileSync(process.env.KEY).toString(),
    cert: fs.readFileSync(process.env.CERT).toString()
}, app).listen(port)