import axios from "axios"

export function getData() {
   return axios.get(`${process.env.REACT_APP_SERVER_URL}data`)
}