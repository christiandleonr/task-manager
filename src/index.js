require('./db/mongoose')
const express = require('express')
const https = require('http')
const fs = require('fs')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const credentials = {key:fs.readFileSync(process.env.KEY).toString(), cert:fs.readFileSync(process.env.CERT).toString()}
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

https.createServer(credentials, app).listen(port)