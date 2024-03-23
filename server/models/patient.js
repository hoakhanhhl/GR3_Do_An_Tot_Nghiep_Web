const mongoose = require('mongoose')

const patientScema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Patient', patientScema)