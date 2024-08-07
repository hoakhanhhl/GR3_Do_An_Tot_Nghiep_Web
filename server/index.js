const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 5000
const app = express()
const crypto = require('crypto');

app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
const patientData = require('./models/patientData')


// Thông tin kết nối mqtt
const mqtt = require('mqtt')
const patient = require('./models/patient')

const protocol = 'mqtt'
const host = 'dev.techlinkvn.com'
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
    clientMqtt.publish(topic, 'nodejs mqtt error', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})



// Thiết lập kết nối đến cơ sở dữ liệu MongoDB dùng Mongoose và URL
const URL = `mongodb+srv://hoaltk:12345678%21
%40%23@atlascluster.lh5zibj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`
// Tạo một thông số của bệnh nhân trong bảng patientData
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
      const temp = data[2];
  
      const accX = data[3];
      const accY = data[4];
      const accZ = data[5];
  
      const gyroX = data[6];
      const gyroY = data[7];
      const gyroZ = data[8];
  
      const irValue = data[9];
      const redValue = data[10];
      const spO2 = data[11];
      const heartRate = data[12];
  
  // gọi hàm InsertPatientData và truyền một đối tượng chứa dữ liệu, chèn dữ liệu vào patientData.js 
      InsertPatientData({
      idDevice : idDevice,
      idPatient : idPatient,
      temp: temp,
      accX: accX,
      accY: accY,
      accZ: accZ,
      gyroX: gyroX,
      gyroY: gyroY,
      gyroZ: gyroZ,
      irValue: irValue, 
      redValue: redValue,
      spO2: spO2,
      heartRate: heartRate,
      uploadTime: new Date()
      }).then((res) => console.log("create data \n"))
    }
  })
  

app.listen(port,async () => {
  console.log(`Example app listening on port ${port}`)
})

// Hàm lấy danh sách bệnh nhân
async function getPatientList(page = 1, perPage = 15) {
  try {
    // Calculate skip value for pagination
    const skip = (page - 1) * perPage;

    // Get total number of documents (optional for pagination metadata)
    const totalDocuments = await patient.countDocuments();

    // Find patients with limit and skip
    const patients = await patient.find({}, null, { skip, limit: perPage, sort: { recentExamDate: -1 } });

    // Respond with patients and total documents (if applicable)
    return { patients, totalDocuments }; // Or adjust response structure as needed
  } catch (error) {
    console.error(error);
    return null;
  }
}

//Tạo random id bệnh nhân
function generateRandomString(length) {
  return crypto.randomBytes(length)
               .toString('base64')
               .slice(0, length)
               .replace(/[^a-zA-Z0-9]/g, ''); // Loại bỏ ký tự không mong muốn
}

//Tạo thông tin bệnh nhân
async function createPatient(data){
    try {
      console.log(data.data)
      let newPatient = data.data;
      newPatient.id = generateRandomString(10)
        const createData = await patient.create(newPatient)
       return createData._id;
    }
    catch(error){
        console.error(error);
        return null;
    }
}

//Update thông tin bệnh nhân
async function updatePatient(data){
  try {
    const update = data.data
      const updateData = await patient.updateOne({_id: update._id}, update).catch((err) => {throw(err)})
     return updateData;
  }
  catch(error){
      console.error(error);
      return null;
  }
}

//Lấy thông số từ thiết bị của bệnh nhân dựa trên id, time
async function getPatientData(id, startTime, endTime){
  console.log(id)
  try {
      dataList = await patientData.find({idPatient: String(id), uploadTime: { $gt: startTime, $lt: endTime }}, null, {}).catch((err) => {throw(err)})
     return dataList;
  }
  catch(error){
      console.error(error);
      return null;
  }
}


// Thêm bệnh nhân
app.post('/patient', async (req, res) => {
  try {
    const patient = req.body; 

    const createdPatientId = await createPatient(patient);

    if (createdPatientId) {
      res.status(201).json({ message: 'Patient created successfully!', id: createdPatientId });
    } else {
      res.status(500).json({ message: 'Error creating patient' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Sửa, update thông tin bệnh nhân
app.put('/patient', async (req, res) => {
  try {
    const patient = req.body; 
    const update = await updatePatient(patient);

    if (update) {
      res.status(200).json({ message: 'Patient updated successfully!'});
    } else {
      res.status(500).json({ message: 'Error updating patient' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//API lấy danh sách bệnh nhân
app.get('/patient', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Lấy giá trị số trang từ query parameter, mặc định là 1 nếu không có
    const perPage = parseInt(req.query.perPage) || 15; // Lấy giá trị số bệnh nhân trên 1 trang từ query parameter, mặc định là 15 nếu không có

    const { patients, totalDocuments } = await getPatientList(page, perPage);

    if (patients) {
      res.status(201).json({ total: totalDocuments, data: patients });
    } else {
      res.status(500).json({ message: 'Error fetching patient' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Hàm lấy thời gian, múi giờ VN -7
function adjustTime(date){
  if (date.getHours() < 7) {
    date.setDate(date.getDate() - 1);
    date.setHours(date.getHours() + 17); // 24 - 7 = 17
  } else {
    date.setHours(date.getHours() - 7);
  }
  return date;
}

//API lấy thông tin từ thiết bị của bệnh nhân
app.get('/patientData/:id', async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime } = req.query;

try {
  const currentDate = new Date();
  // Giảm đi một tuần
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const parsedStartTime = startTime ? adjustTime(new Date(startTime)) : oneWeekAgo;
  const parsedEndTime = endTime ? adjustTime(new Date(endTime)) : currentDate;

   console.log(parsedStartTime, parsedEndTime)
  if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  const data = await getPatientData(id, parsedStartTime, parsedEndTime);

  if (data) {
    res.status(200).json({ total: data.length, data: data });
  } else {
    res.status(404).json({ message: 'No data found' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});