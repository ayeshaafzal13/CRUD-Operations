const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dns = require('dns')

const path = require('path')

dns.setDefaultResultOrder('ipv4first')
require('dotenv').config()
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

const MONGOBD_URL = process.env.MONGOBD_URL

if(!MONGOBD_URL) {
    console.log("MONGODB_URL is not found in .env file")
    process.exit(1)
}

mongoose.connect(MONGOBD_URL)
.then(() => console.log("Connected to MongoDB Successfully!"))
.catch(err => {
    console.error("MongoDB connection error: ", err.message)
    process.exit(1)
})

app.get('/api/users', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post('/createUser', (req, res) => {
    const { name, email, age } = req.body
    if (!name || !email || !age) {
        return res.status(400).json({ error: "All fields are required" })
    }
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is Running")
})