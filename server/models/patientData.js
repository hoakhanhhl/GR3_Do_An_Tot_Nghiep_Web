const mongoose = require('mongoose')

const patientDataScema = new mongoose.Schema({
    idDevice: String,
    idPatient: String,
    accX: Number,
    accY: Number,
    accZ: Number,
    gyroX: Number,
    gyroY: Number,
    gyroZ: Number,
    angX: Number,
    angY: Number, 
    angZ: Number,
})

module.exports = mongoose.model('patientData', patientDataScema)