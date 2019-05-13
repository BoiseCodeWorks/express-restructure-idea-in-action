//THIS FILE IS PRETTY MUCH ALWAYS THE SAME
import mongoose from 'mongoose'

//CHANGES FROM PROJECT TO PROJECT
//mongodb://<Username>:<password>@<database server>/<server name>
const connectionString = 'mongodb://markcoffeeshop:coffee!@den1.mongo1.gear.host:27001/markcoffeeshop'

let connection = mongoose.connection

//establishes connection to database
mongoose.connect(connectionString, {
    useNewUrlParser: true
})

//console log errors
connection.on('error', err => {
    console.log('[DATABASE ERROR]: ', err)
})

//confirm connection
connection.once('open', () => {
    console.log('Successfully connected to database')
})