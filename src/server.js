// Imports
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const dotenv = require('dotenv')
dotenv.config()

// App
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(routes)

// PORT
app.listen(3333)

console.log('Server running')
