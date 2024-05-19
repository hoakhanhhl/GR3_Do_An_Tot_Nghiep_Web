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

const statusObj = {
  onFollow: { color: 'info', label: "đang theo dõi" },
  discharge: { color: 'success', label: "đã xuất viện" }
}

const DashboardTable = ({rows}) => {
  return (
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
              <TableRow hover key={row.Id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.id}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.recentExamDate}</TableCell>
                <TableCell>{row.nextExamDate}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.deviceId}</TableCell>
                <TableCell>
                  <Chip
                    label={statusObj[row.status].label}
                    color={statusObj[row.status].color}
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
  )
}

export default DashboardTable
