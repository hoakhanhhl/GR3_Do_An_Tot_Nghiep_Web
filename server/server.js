const express = require('express')
const app = express()
const port = 5000
const mqtt = require('mqtt')


const protocol = 'mqtt'
const host = 'sinno.soict.ai'
const mqttPort = '1883'
const clientId = `08:3A:8D:9A:3F:A4`

const topic = 'dulieu'

const connectUrl = `${protocol}://${host}:${mqttPort}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'hoaltk',
    password: '123456',
    reconnectPeriod: 1000,

    // // If the server is using a self-signed certificate, you need to pass the CA.
    // ca: fs.readFileSync('./broker.emqx.io-ca.crt'),
})

client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic 'dulieu'`)
    })
})

client.on('connect', () => {
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString(), new Date())
})

app.get('/', (req, res) => {
    res.send('Hello World1')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})