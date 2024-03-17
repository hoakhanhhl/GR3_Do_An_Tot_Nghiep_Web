import React, { useState } from "react";
import { getData } from "./api/api";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale,
    Legend,
    Tooltip
)
function App() {
  const [filteredData, setFilteredData] = useState(null)
  const [accxData , setAccxData] = useState(null)
  const getBEData = () => {
    getData().then((res) => { 
        let filteredData = res.data.filteredData
        setFilteredData(filteredData.map(innerArray => innerArray[0]))
        let accxData = res.data.listAccx
        setAccxData(accxData)
    })
  }
  console.log(filteredData, accxData)
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
        label: 'data sau khi kalman',
        data: filteredData,
        backgroundColor: 'aqua',
        borderColor: 'black',
        fill: true,
        tension: 0.5
    },
    {
        label: 'data accx trc khi kalman',
        data: accxData,
        backgroundColor: 'red',
        borderColor: 'blue',
        fill: true,
        tension: 0.5
    },
]
  }
  const options = {
    plugins: {
        legend: true
    },
    scales: {
        y: {
            min: -0.5,
            max: 1.5
        },
    }
  }
  return <div> 
    <button onClick={getBEData}>click me</button>
    <div style={{ width: 500, height: 500}}>
    {filteredData && accxData && 
       <Line data={data}
      options={options}
      ></Line>}
    </div>
     </div>;
}

export default App;
