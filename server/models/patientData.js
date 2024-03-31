const mongoose = require('mongoose')
// // định nghĩa của mô hình dữ liệu bệnh nhân
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
// //tạo một đối tượng schema mới bằng cách truyền vào một đối tượng chứa mô tả cấu trúc dữ liệu của bệnh nhân