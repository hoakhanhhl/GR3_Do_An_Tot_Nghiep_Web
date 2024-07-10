// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import { Calendar } from 'mdi-material-ui'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

const FormCreatePatient = props => {
  const [data, setData] = useState({
    name: '',
    age: 1,
    id: '',
    recentExamDate: new Date(),
    nextExamDate: new Date(),
    deviceId: '',
    description: '',
    status: 'onFollow',
    gender: 'male'
  })

  const handleChangeFormData = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleChangeFormDataDate = (value, label) => {
    setData({ ...data, [label]: value })
  }

  const onSubmitForm = async () => {
    console.log(data)
    await axios.post(`http://localhost:5000/patient`, { data }).then(res => {
      toast.success('Thêm bệnh nhân thành công!')
      props.setRefetch(!props.refetch)
      props.onCloseDialog()
    })
  }

  return (
    <Card>
      <CardHeader title='Thêm thông tin bệnh nhân' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='name'
                onChange={handleChangeFormData}
                value={data.name}
                label='Tên bệnh nhân'
                placeholder='Nhập tên bệnh nhân'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                name='recentExamDate'
                onChange={value => handleChangeFormDataDate(value.toDate(), 'recentExamDate')}
                value={dayjs(data.recentExamDate)}
                sx={{ width: '46%', marginRight: 5 }}
                showYearDropdown
                showMonthDropdown
                label='Ngày khám bệnh'
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
              <DatePicker
                name='nextExamDate'
                onChange={value => handleChangeFormDataDate(value.toDate(), 'nextExamDate')}
                value={dayjs(data.nextExamDate)}
                sx={{ width: '46%', marginLeft: 5 }}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                label='Ngày tái khám'
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
            <Grid item xs={4}>
              <TextField
                fullWidth
                type='number'
                name='age'
                onChange={handleChangeFormData}
                value={data.age}
                label='Tuổi'
                placeholder=''
                helperText=''
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                name='gender'
                onChange={handleChangeFormData}
                value={data.gender}
                label='Giới tính'
                placeholder='Giới tính'
                helperText=''
              >
                <MenuItem value={'male'}>Nam</MenuItem>
                <MenuItem value={'female'}>Nữ</MenuItem>
                <MenuItem value={'other'}>khác</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Mô tả'
                name='description'
                onChange={handleChangeFormData}
                value={data.description}
                placeholder='Thêm mô tả'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' onClick={onSubmitForm}>
                Tạo hồ sơ
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormCreatePatient
