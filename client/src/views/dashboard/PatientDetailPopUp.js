import { Box, Button, Card, CardMedia, Chip, Typography } from '@mui/material'
import moment from 'moment'
import { statusObj } from './Table'
import { useState } from 'react'
import FormUpdatePatient from '../form-layouts/FormUpdatePatient'

const convertGender = value => {
  if (value === 'female') return 'Nữ'
  if (value === 'other') return 'Khác'

  return 'Nam'
}

export default function PatientDetailPopUp(props) {
  const patient = props.detail
  const [onOpenUpdate, setOnOpenUpdate] = useState(false);

  return (
    <Box p={5} minHeight={500} maxHeight={700} sx={{ overflowY: 'scroll' }}>
      {onOpenUpdate ? 
      <>
        <FormUpdatePatient patient={patient} setOnOpenUpdate={setOnOpenUpdate} refetch={props.refetch} setRefetch={props.setRefetch} onCloseDialog={props.onCloseDialog} />
      </> :
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
        </Box>
      </Box>
      <br />
      <Typography variant='h5' fontWeight={600} display="flex" alignItems="center" justifyContent="space-between">
        Thông tin cơ bản
        <Button variant="outlined" onClick={() => setOnOpenUpdate(true)}>Update thông tin bệnh nhân</Button>
      </Typography>
      <Box paddingY={4}>
        <Typography fontSize={20} paddingY={0.5}>
          <b>Tuổi:</b> {patient?.age}
        </Typography>
        <Typography fontSize={20} paddingY={0.5}>
          <b>Giới tính:</b> {convertGender(patient?.gender)}
        </Typography>
        <Typography fontSize={20} paddingY={0.5}>
          <b>Id thiết bị:</b> {patient?.deviceId ? patient?.deviceId : 'chưa cập nhật'}
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
      thông tin các biểu đồ của người bệnh ở đây ...
      </>}
    </Box>
  )
}
