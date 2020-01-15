const express = require('express')
const mongoose= require('mongoose')
const routes  = require('./routes')
const app = express()
const dotenv = require('dotenv')

dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-9q0zd.mongodb.net/devs?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 1000})

// configura para todas as requisições que o express entenderá JSON
app.use(express.json())
app.use(routes)

// configura a porta que a aplicação executará
app.listen(3333)

