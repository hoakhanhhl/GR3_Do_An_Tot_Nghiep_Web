// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { Button, Dialog } from '@mui/material'
import { useEffect, useState } from 'react'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

{
  /* <TableCell>Id</TableCell>
<TableCell>Tên bệnh nhân</TableCell>
<TableCell>Ngày khám gần nhất</TableCell>
<TableCell>Ngày tái khám</TableCell>
<TableCell>Tuổi</TableCell>
<TableCell>Id thiết bị</TableCell> */
}

const rows = [
  {
    age: 27,
    recentExamDate: '09/27/2018',
    nextExamDate: '09/27/2018',
    name: 'Sally Quinn',
    deviceId: '$19586.23',
    id: 'abcd',
    status: 'discharge'
  },
  {
    age: 27,
    recentExamDate: '09/27/2018',
    nextExamDate: '09/27/2018',
    name: 'Sally Quinn',
    deviceId: '$19586.23',
    id: 'abcd',
    status: 'onFollow'
  },
  {
    age: 27,
    recentExamDate: '09/27/2018',
    nextExamDate: '09/27/2018',
    name: 'Sally Quinn',
    deviceId: '$19586.23',
    id: 'abcd',
    status: 'onFollow'
  }
]

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [patientList, setPatientList] = useState(null)
  const [total, setTotal] = useState(0)
  const [refetch, setRefetch] = useState(true)
  useEffect(() => {
    async function call() {
      await axios.get(`http://localhost:5000/patient`).then(res => {
        console.log(res.data.data)
        setPatientList(res.data.data)
        setTotal(res.data.total)
      })
    }
    call()
  }, [refetch])

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Trophy />
          </Grid>
          <Grid item xs={12} md={8}>
            <StatisticsCard />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <WeeklyOverview />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TotalEarning />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='25'
                  icon={<Poll />}
                  color='success'
                  trendNumber='+42%'
                  title='Ngoại trú'
                  subtitle='Bệnh nhân mới trong tuần'
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='15.500.000'
                  title='Vật tư tiêu hao'
                  trend='negative'
                  color='secondary'
                  trendNumber='-15%'
                  subtitle='Tuần trước'
                  icon={<CurrencyUsd />}
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='62'
                  trend='negative'
                  trendNumber='-18%'
                  title='Tiếp nhận'
                  subtitle='Lịch đặt khám tuần sau'
                  icon={<BriefcaseVariantOutline />}
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='15'
                  color='warning'
                  trend='negative'
                  trendNumber='-18%'
                  subtitle='Số bệnh án tuần trước'
                  title='Khám lâm sàng'
                  icon={<HelpCircleOutline />}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SalesByCountries />
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <DepositWithdraw />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' onClick={handleOpenDialog}>
              Thêm bệnh nhân
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table rows={patientList ? patientList : rows} refetch={refetch} setRefetch={setRefetch}/>
          </Grid>
        </Grid>
        <Dialog onClose={handleCloseDialog} open={openDialog}>
          <FormLayoutsIcons onCloseDialog={handleCloseDialog} setRefetch={setRefetch} refetch={refetch}/>
        </Dialog>
        <Toaster
          position='bottom-right'
          toastOptions={{
            // Define default options
            className: '',
            duration: 2500,
            style: {
              background: '#363636',
              color: '#fff'
            },

            // Default options for specific types
            success: {
              duration: 2500,
              theme: {
                primary: 'green',
                secondary: 'black'
              }
            }
          }}
        />
      </ApexChartWrapper>
    </LocalizationProvider>
  )
}

export default Dashboard
