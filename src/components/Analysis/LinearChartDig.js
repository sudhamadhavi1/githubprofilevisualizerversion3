// import './styles.css'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts'
import './linearchart.css'

// const data1 = [
//   {
//     name: '2015-Q3',
//     commits: 1,
//   },
//   {
//     name: '2015-Q4',
//     commits: 0,
//   },
//   {
//     name: '2016-Q1',
//     commits: 4,
//   },
//   {
//     name: '2016-Q2',
//     commits: 2,
//   },
//   {
//     name: '2016-Q3',
//     commits: 5,
//   },
//   {
//     name: '2016-Q4',
//     commits: 3,
//   },
// ]

const LinearChartDig = props => {
  const {data} = props
  const converteddata = Object.keys(data).map(key => ({
    name: key,
    commits: data[key],
  }))
  console.log('Data in LineChar', converteddata)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={converteddata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#3B82F6"
          horizontal={false}
        />
        <XAxis dataKey="name" stroke="#3B82F6" tick={{fill: '#3B82F6'}}>
          <Label
            value="Commits per Quarter"
            offset={-12}
            position="insideBottom"
            style={{
              textAnchor: 'middle',
              fill: '#3b82f6',
              fontSize: '16px',
              fontWeight: '600',
            }}
          />
        </XAxis>
        <YAxis stroke="#3B82F6" tick={{fill: '#3B82F6'}} />
        <Tooltip />
        <Line
          type="linear"
          dataKey="commits"
          stroke="#3B82F6"
          dot={{fill: '#3B82F6', r: 3}}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LinearChartDig
