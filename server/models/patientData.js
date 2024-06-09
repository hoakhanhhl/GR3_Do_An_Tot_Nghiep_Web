const mongoose = require('mongoose')
// // định nghĩa của mô hình dữ liệu bệnh nhân
const patientDataScema = new mongoose.Schema({
    idDevice: String,
    idPatient: String,
    temp: Number,
    accX: Number,
    accY: Number,
    accZ: Number,
    gyroX: Number,
    gyroY: Number,
    gyroZ: Number,
    irValue: Number, 
    redValue: Number,
    spO2: Number,
    heartRate: Number,
    uploadTime: Date,
})

module.exports = mongoose.model('patientdatas', patientDataScema)
// //tạo một đối tượng schema mới bằng cách truyền vào một đối tượng chứa mô tả cấu trúc dữ liệu của bệnh nhân