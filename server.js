const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./routes')(app)

const PORT = process.env.PORT || 8001

app.listen(PORT)
