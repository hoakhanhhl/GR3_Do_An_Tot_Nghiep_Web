// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Dialog } from '@mui/material'
import { useState } from 'react'
import PatientDetailPopUp from './PatientDetailPopUp'

export const statusObj = {
  admitted: { color: 'warning', label: "đã nhập viện" },
  onFollow: { color: 'info', label: "đang theo dõi" },
  discharge: { color: 'success', label: "đã xuất viện" }
}


const DashboardTable = ({rows, refetch, setRefetch}) => {

  const [openDialog, setOpenDialog] = useState(false)
  const [patientDetail, setPatientDetail] = useState(null)

  const handleOpenDialog = (detail) => {
    setPatientDetail(detail)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên bệnh nhân</TableCell>
              <TableCell>Ngày khám gần nhất</TableCell>
              <TableCell>Ngày tái khám</TableCell>
              <TableCell>Tuổi</TableCell>
              <TableCell>Id thiết bị</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 }, cursor: "pointer" }} onClick={() => handleOpenDialog(row)}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important'}}>{row._id}</Typography>
                    <Typography variant='caption'>{row?.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.recentExamDate}</TableCell>
                <TableCell>{row?.nextExamDate}</TableCell>
                <TableCell>{row?.age}</TableCell>
                <TableCell>{row?.deviceId}</TableCell>
                <TableCell>
                  <Chip
                    label={statusObj[row?.status]?.label}
                    color={statusObj[row?.status]?.color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    <Dialog onClose={handleCloseDialog} open={openDialog} sx={{ ".css-12tnra4-MuiPaper-root-MuiDialog-paper": {
      maxWidth: "800px !important"
    } }}>
      <PatientDetailPopUp detail={patientDetail} refetch={refetch} onCloseDialog={handleCloseDialog} setRefetch={setRefetch}/>
    </Dialog>
    </>
  )
}

export default DashboardTable
