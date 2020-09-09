require('./db/mongoose')
const express = require('express')
const https = require('https')
const fs = require('fs')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

https.createServer({
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT)
}, app).listen(port)