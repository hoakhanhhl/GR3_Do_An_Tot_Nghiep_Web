const mongoose = require('mongoose')
// // định nghĩa của mô hình dữ liệu bệnh nhân
const patientScema = new mongoose.Schema({
    name: String,
    age: Number,
    recentExamDate: Date,
    nextExamDate: Date,
    deviceId: String,
    description: String,
    status: String,
    gender: String,
})
module.exports = mongoose.model('patients', patientScema)
// //tạo một đối tượng schema mới bằng cách truyền vào một đối tượng chứa mô tả cấu trúc dữ liệu của bệnh nhân