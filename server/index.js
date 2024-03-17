const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
    //Thông tin kết nối mqtt
const mqtt = require('mqtt')
const protocol = 'mqtt'
const host = 'sinno.soict.ai'
const mqttPort = '1883'
const topic = 'dulieu'

const { KalmanFilter } = require('kalman-filter')
const kFilter = new KalmanFilter()
let listAccx = []
let fields = []
let filteredData = null
const connectUrl = `${protocol}://${host}:${mqttPort}`
const client = mqtt.connect(connectUrl, {
    clean: true,
    connectTimeout: 4000,
    username: 'student',
    password: 'sinhvien',
    reconnectPeriod: 1000
})

// Thông báo kết quả kết nối mqtt server
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic 'dulieu'`)
    })
})

//Thông báo kết nối lỗi
client.on('connect', () => {
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})

// In kết quả
client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString(), new Date())
    const data = payload.toString().split(',')
    if (data[2] && listAccx.length < 10) {
        listAccx.push(Number([data[2]]))
        console.log(listAccx)
    }
    if (listAccx.length === 10) {
        filteredData = kFilter.filterAll(listAccx)
        console.log(filteredData)
    }
})

app.get('/', (req, res) => {
    res.send("hello world")
})
app.get('/data', (req, res) => {
    res.send({ filteredData: filteredData, listAccx: listAccx })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})