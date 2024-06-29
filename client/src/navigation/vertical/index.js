// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Cài đặt',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Trang'
    },
    {
      title: 'Đăng nhập',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Đăng ký',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'Bác sĩ'
    },
    {
      title: 'Bệnh nhân',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Thuốc',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Vật tư',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Thống kê',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Danh mục',
      path: '/form-layouts'
    }
  ]
}

export default navigation
