const app = require('./app')
const https = require('http')
const fs = require('fs')

const credentials = {key:fs.readFileSync(process.env.KEY).toString(), cert:fs.readFileSync(process.env.CERT).toString()}
const port = process.env.PORT

https.createServer(credentials, app).listen(port)