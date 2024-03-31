const express = require('express')
const app = express()
const port = 5000

// //Thông tin thuật toán kalman
const KalmanFilter = require('kalmanjs');
const kFilter = new KalmanFilter()
// let listAccX = []
// let fields = []
// let filteredData = null
// const cors = require('cors')
// app.use(cors())

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

// // Thông báo kết quả kết nối mqtt server
clientMqtt.on('connect', () => {
    console.log('Connected')
    clientMqtt.subscribe([topic], () => {
        console.log(`Subscribe to topic 'dulieu'`)
    })
})

async function InsertPatientData (data) {
  await patientData.create(data)
}

// //Thông báo kết nối lỗi mqtt
clientMqtt.on('connect', () => {
    clientMqtt.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})

// // In kết quả
clientMqtt.on('message', (topic, payload) => {
    const data = payload.toString().split(',');
    if(data.length > 5) {
    const idDevice = String(data[0]);
    const idPatient = String(data[1]);
    const accX = data[2];
    const accY = data[3];
    const accZ = data[4];

    const gyroX = data[5];
    const gyroY = data[6];
    const gyroZ = data[7];

    const angX = data[8];
    const angY = data[9];
    const angZ = data[10];

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
    console.log(idDevice);
    console.log(idPatient);
  }

})

// app.get('/', (req, res) => {
//     res.send("hello world")
// })
// // app.get('/data', (req, res) => {
// //     res.send({ filteredData: filteredData, listAccx: listAccx })
// // })


app.listen(port,async () => {
    console.log(`Example app listening on port ${port}`)
})
const mongoose = require('mongoose')
const URL = `mongodb+srv://hoaltk:12345678%21
%40%23@atlascluster.lh5zibj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`
const patientData = require('./models/patientData')
const connectDB = async () => {
  try {
    await mongoose.connect(URL).then(()=>console.log("connected")
    )
    
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDB()

async function GetPatientDataByPatientId (id) {
  await patientData.find({idPatient: id}).then((data) => console.log(data))
} 

