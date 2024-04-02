const express = require('express')
const app = express()
const port = 5000

//Thông tin thuật toán kalman
const KalmanFilter = require('kalmanjs');
const kFilter = new KalmanFilter()

// Thông tin kết nối mqtt
const mqtt = require('mqtt')
const protocol = 'mqtt'
const host = 'sinno.soict.ai'
const mqttPort = '1883'
const topic = 'dulieu'

const connectUrl = `${protocol}://${host}:${mqttPort}`
const clientMqtt = mqtt.connect(connectUrl, {
    clean: true,
    connectTimeout: 4000,
    username: 'student',
    password: 'sinhvien',
    reconnectPeriod: 1000
})

// Thông báo kết quả kết nối mqtt server
clientMqtt.on('connect', () => {
    console.log('Connected')
    clientMqtt.subscribe([topic], () => {
        console.log(`Subscribe to topic 'dulieu'`)
    })
})


//Thông báo kết nối lỗi mqtt
clientMqtt.on('connect', () => {
    clientMqtt.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})

// import patientData.js - định nghĩa dữ liệu bệnh nhân để chèn dữ liệu
const patientData = require('./models/patientData')

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB dùng Mongoose và URL
const mongoose = require('mongoose')
const URL = `mongodb+srv://hoaltk:12345678%21
%40%23@atlascluster.lh5zibj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`
// Tạo một hàm async
async function InsertPatientData (data) {
  await patientData.create(data)
}
// Thông báo "connected" thành công. Nếu có lỗi thông báo lỗi và thoát quá trình chạy (exit process).
const connectDB = async () => {
  try {
    await mongoose.connect(URL).then(()=>console.log("connected")
// // mongoose.connect() kết nối đến cơ sở dữ liệu MongoDB, await để đợi cho đến khi kết nối hoàn thành
    )  
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDB()

// Listen message MQTT
clientMqtt.on('message', (topic, payload) => {
// Chuyển đổi thành chuỗi và chia một mảng tên là data, sử dụng (',') làm dấu phân cách
    const data = payload.toString().split(',');
    if(data.length > 5) {
// Trích xuất dữ liệu bệnh nhân từ message, gán giá trị vào các biến tương ứng
    const idDevice = String(data[0]);
    const idPatient = String(data[1]);
    const accX = kFilter.filter(data[2]);
    const accY = kFilter.filter(data[3]);
    const accZ = kFilter.filter(data[4]);

    const gyroX = kFilter.filter(data[5]);
    const gyroY = kFilter.filter(data[6]);
    const gyroZ = kFilter.filter(data[7]);

    const angX = kFilter.filter(data[8]);
    const angY = kFilter.filter(data[9]);
    const angZ = kFilter.filter(data[10]);

// gọi hàm InsertPatientData và truyền một đối tượng chứa dữ liệu, chèn dữ liệu vào patientData.js 
    InsertPatientData({
    idDevice : idDevice,
    idPatient : idPatient,
    accX : accX,
    accY: accY,
    accZ: accZ,
    gyroX: gyroX,
    gyroY: gyroY,
    gyroZ: gyroZ,
    angX: angX,
    angY: angY, 
    angZ: angZ,
    }).then((res) => console.log("create data \n"))
// khi dữ liệu được chèn thành công thông báo "create data"    
  }
})

app.listen(port,async () => {
  console.log(`Example app listening on port ${port}`)
})

// // Truy vấn dữ liệu bệnh nhân từ cơ sở dữ liệu dựa trên ID bệnh nhân được cung cấp
// async function GetPatientDataByPatientId (id) {
//   await patientData.find({idPatient: id}).then((data) => console.log(data))
// } 

// app.get('/', (req, res) => {
//     res.send("hello world")
// })
// // app.get('/data', (req, res) => {
// //     res.send({ filteredData: filteredData, listAccx: listAccx })
// // })