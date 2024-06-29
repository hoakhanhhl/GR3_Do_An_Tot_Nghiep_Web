import { Box, Button, Card, CardMedia, Chip, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import moment from 'moment'
import { statusObj } from './Table'
import { lazy, useEffect, useState } from 'react'
import FormUpdatePatient from '../form-layouts/FormUpdatePatient'
import axios from 'axios'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { Calendar, Domain } from 'mdi-material-ui'
import dayjs from 'dayjs'

const convertGender = value => {
  if (value === 'female') return 'Nữ'
  if (value === 'other') return 'Khác'

  return 'Nam'
}

export default function PatientDetailPopUp(props) {
  const [LineChart, setLineChart] = useState(null)
  const [markElementClasses, setMarkElementClasses] = useState(null)
  const [listDataDetail, setListDataDetail] = useState([])
  const patient = props.detail
  const [onOpenUpdate, setOnOpenUpdate] = useState(false)

  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [filter, setFilter] = useState({
    startDate: oneWeekAgo,
    endDate: currentDate
  })
  console.log([...new Set(listDataDetail.map(data => new Date(data.uploadTime).toISOString().split('T')[0]))])

  // fetch patient data for charts

  const patientId = patient.id && patient.id.length > 0 ? patient.id : patient._id;
  useEffect(() => {
    import('@mui/x-charts').then(module => {
      setLineChart(() => module.LineChart)
      setMarkElementClasses(() => module.markElementClasses)
    })

    async function call() {
      await axios.get(`http://localhost:5000/patientData/${patientId}?startTime=${filter.startDate}&endTime=${filter.endDate}`).then(res => {
        // console.log(res.data.data)
        setListDataDetail(res.data.data)
      })
    }
    call()
  }, [patientId, filter])

  if (!LineChart) return <div>Loading...</div>

  return (
    <Box p={5} minHeight={500} maxHeight={800} sx={{ overflowY: 'scroll' }}>
      {onOpenUpdate ? (
        <>
          <FormUpdatePatient
            patient={patient}
            setOnOpenUpdate={setOnOpenUpdate}
            refetch={props.refetch}
            setRefetch={props.setRefetch}
            onCloseDialog={props.onCloseDialog}
          />
        </>
      ) : (
        <>
          <Box display='flex' alignItems='center'>
            <Card sx={{ width: '30%', mr: 3 }}>
              <CardMedia
                component='img'
                sx={{ width: '100%' }}
                image='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg'
                alt='default image'
              />
            </Card>
            <Box>
              <Typography variant='h3'>{patient?.name}</Typography>
              <Typography fontSize={20}>{/* <b>Id:</b> {patient?._id} */}</Typography>
              <Typography fontSize={20}><b>Id:</b> {patient?.id}</Typography>
            </Box>
          </Box>
          <br />
          <Typography variant='h5' fontWeight={600} display='flex' alignItems='center' justifyContent='space-between'>
            Thông tin cơ bản
            <Button variant='outlined' onClick={() => setOnOpenUpdate(true)}>
              Update thông tin bệnh nhân
            </Button>
          </Typography>
          <Box paddingY={4}>
            <Typography fontSize={20} paddingY={0.5}>
              <b>Tuổi:</b> {patient?.age}
            </Typography>
            <Typography fontSize={20} paddingY={0.5}>
              <b>Giới tính:</b> {convertGender(patient?.gender)}
            </Typography>
            <Typography fontSize={20} paddingY={0.5}>
              <b>Id thiết bị:</b> {listDataDetail.map(data => data.idDevice)[0]}
            </Typography>
            <Typography fontSize={20} paddingY={0.5}>
              <b>Ngày khám bệnh gần nhất:</b> {moment(patient?.recentExamDate).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Typography fontSize={20} paddingY={0.5}>
              <b>Ngày tái khám dự kiến: </b>
              {moment(patient?.nextExamDate).format('MMMM Do YYYY')}
            </Typography>
            <Typography fontSize={20} paddingY={0.5}>
              <b>Mô tả: </b>
              {patient?.description}
            </Typography>
            <Typography fontSize={20} paddingY={0.5}>
              <b>trạng thái:</b>
              <Chip
                label={statusObj[patient?.status]?.label}
                color={statusObj[patient?.status]?.color}
                sx={{
                  height: 30,
                  fontSize: '1rem',
                  mx: 3,
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { fontWeight: 600 }
                }}
              />
            </Typography>
          </Box>
          <Typography variant='h5' fontWeight={600}>
            Thông tin tình trạng bệnh
          </Typography>
          <br />
          <Typography fontSize={16} fontWeight={500} pb={5} display="flex" alignItems="center" justifyContent="space-between">
            Chọn khoảng thời gian   <Button variant="outlined" onClick={() => setFilter({startDate: oneWeekAgo, endDate: currentDate })}>Xóa lựa chọn</Button>
          </Typography>
          <Grid item xs={12} pb={5}>
            <DateTimePicker
              name='startDate'
              onChange={value => setFilter({...filter, startDate: value.toDate()})}
              value={dayjs(filter.startDate)}
              sx={{ width: '46%', marginRight: 5 }}
              showYearDropdown
              showMonthDropdown
              label='Bắt đầu'
              id='account-settings-date'
              placeholderText='MM-DD-YYYY'
              customInput={
                <TextField
                  placeholder=''
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Calendar />
                      </InputAdornment>
                    )
                  }}
                />
              }
            />
            <DateTimePicker
              name='endDate'
              onChange={value => setFilter({...filter, endDate: value.toDate()})}
              value={dayjs(filter.endDate)}
              sx={{ width: '46%', marginLeft: 5 }}
              showYearDropdown
              showMonthDropdown
              id='account-settings-date'
              label='Kết thúc'
              placeholderText='MM-DD-YYYY'
              customInput={
                <TextField
                  placeholder=''
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Calendar />
                      </InputAdornment>
                    )
                  }}
                />
              }
            />
          </Grid>
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.accX),
                label: 'accX'
              }
            ]}
            yAxis={[{ 
              data: listDataDetail.map(data => data.accX)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.accY),
                label: 'accY'
              }
            ]}
            yAxis={[{ 
              data: listDataDetail.map(data => data.accY)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.accZ),
                label: 'accZ'
              }
            ]}
            yAxis={[{ 
              data: listDataDetail.map(data => data.accZ)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.gyroX),
                label: 'gyroX'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.gyroX)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.gyroY),
                label: 'gyroY'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.gyroY)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.gyroZ),
                label: 'gyroZ'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.gyroZ)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.temp),
                label: 'Nhiet do (C)'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.temp)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.heartRate),
                label: 'Nhip tim'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.heartRate)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.redValue),
                label: 'Red value'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.redValue)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.irValue),
                label: 'ir value'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.irValue)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.1
              }
            }}
            width={1000}
            height={500}
          />
          <LineChart
            series={[
              {
                data: listDataDetail.map(data => data.spO2),
                label: 'SpO2'
              }
            ]}

            yAxis={[{ 
              data: listDataDetail.map(data => data.spO2)
            }]}

            xAxis={[{ 
              label: "Thoi gian",
              data: listDataDetail.map(data => new Date(data.uploadTime)),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("MM/DD/hh:mm:ss "), 
              tickLabelPlacement: 'tick',
              min: listDataDetail.map(data => new Date(data.uploadTime))[0],
            }]}

            sx={{
              [`& .${markElementClasses && markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.0',
                fill: '#fff',
                strokeWidth: 0.5
              }
            }}
            width={1000}
            height={500}
          />
        </>
      )}
    </Box>
  )
}
