const express = require('express')
const app = express()
const port = 5000

// //Thông tin thuật toán kalman
// const KalmanFilter = require('kalmanjs');
// const kFilter = new KalmanFilter()
// // let listAccX = []
// // let fields = []
// // let filteredData = null
// // const cors = require('cors')
// // app.use(cors())

// // Thông tin kết nối mqtt
// const mqtt = require('mqtt')
// const protocol = 'mqtt'
// const host = 'sinno.soict.ai'
// const mqttPort = '1883'
// const topic = 'dulieu'

// const connectUrl = `${protocol}://${host}:${mqttPort}`
// const clientMqtt = mqtt.connect(connectUrl, {
//     clean: true,
//     connectTimeout: 4000,
//     username: 'student',
//     password: 'sinhvien',
//     reconnectPeriod: 1000
// })

// // Thông báo kết quả kết nối mqtt server
// clientMqtt.on('connect', () => {
//     console.log('Connected')
//     clientMqtt.subscribe([topic], () => {
//         console.log(`Subscribe to topic 'dulieu'`)
//     })
// })

// //Thông báo kết nối lỗi mqtt
// clientMqtt.on('connect', () => {
//     clientMqtt.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//         if (error) {
//             console.error(error)
//         }
//     })
// })

// // In kết quả
// clientMqtt.on('message', (topic, payload) => {
//     const data = payload.toString().split(',');
//     const listAccX = kFilter.filter(Number(data[2]));
//     const listAccY = kFilter.filter(Number(data[3]));
//     const listAccZ = kFilter.filter(Number(data[4]));

//     const listGyroX = kFilter.filter(Number(data[5]));
//     const listGyroY = kFilter.filter(Number(data[6]));
//     const listGyroZ = kFilter.filter(Number(data[7]));

//     const listAngX = kFilter.filter(Number(data[8]));
//     const listAngY = kFilter.filter(Number(data[9]));
//     const listAngZ = kFilter.filter(Number(data[10]));

//     console.log(listAccX);
//     console.log(listAccY);
//     console.log(listAccZ);

//     console.log(listGyroX);
//     console.log(listGyroY);
//     console.log(listGyroZ);

//     console.log(listAngX);
//     console.log(listAngY);
//     console.log(listAngZ);

//     console.log(data[0]);
//     console.log(data[1]);
// })

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
const Patient = require('./models/patient')
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

async function InsetPatient () {
    await Patient.create({
        name: 'Hoa',
        age: 70
    })
}

InsetPatient()