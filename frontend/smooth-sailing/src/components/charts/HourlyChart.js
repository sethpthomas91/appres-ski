
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
// test data for the chart
// const data = [
//   {
//     name: "0100",
//     wind: 0,
//     amt: 2400
//   },
//   {
//     name: "0200",
//     wind: 0,
//     amt: 2210
//   },
//   {
//     name: "0300",
//     wind: 0,
//     amt: 2290
//   },
//   {
//     name: "0400",
//     wind: 0,
//     amt: 2000
//   },
//   {
//     name: "0500",
//     wind: 0,
//     amt: 2181
//   },
//   {
//     name: "0600",
//     wind: 0,
//     amt: 2500
//   },
//   {
//     name: "0700",
//     wind: 5,
//     amt: 2100
//   },
//   {
//     name: "0800",
//     wind: 6,
//     amt: 2100
//   },
//   {
//     name: "0900",
//     wind: 5,
//     amt: 2100
//   },
//   {
//     name: "1000",
//     wind: 8,
//     amt: 2100
//   },
//   {
//     name: "1100",
//     wind: 7,
//     amt: 2100
//   },
//   {
//     name: "1200",
//     wind: 6,
//     amt: 2100
//   },
//   {
//     name: "1300",
//     wind: 5,
//     amt: 2100
//   },
//   {
//     name: "1400",
//     wind: 10,
//     amt: 2100
//   },
//   {
//     name: "1500",
//     wind: 11,
//     amt: 2100
//   },
//   {
//     name: "1600",
//     wind: 6,
//     amt: 2100
//   },
//   {
//     name: "1700",
//     wind: 4,
//     amt: 2100
//   },
//   {
//     name: "1800",
//     wind: 2,
//     amt: 2100
//   },
//   {
//     name: "1900",
//     wind: 1,
//     amt: 2100
//   },
//   {
//     name: "2000",
//     wind: 0,
//     amt: 2100
//   },
//   {
//     name: "2100",
//     wind: 0,
//     amt: 2100
//   },
//   {
//     name: "2200",
//     wind: 0,
//     amt: 2100
//   },
//   {
//     name: "2300",
//     wind: 0,
//     amt: 2100
//   },
//   {
//     name: "2400",
//     wind: 0,
//     amt: 2100
//   },
// ];

const HourlyChart = (props) => {
  // props
  const { hourlyData, boat } = props
  // states

  const generateChart = () => {
    return (
      <LineChart
        width={800}
        height={300}
        data={hourlyData}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="startHour" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <ReferenceLine x="0600" stroke="red" label="Boat in water" />
        <ReferenceLine x="1800" stroke="red" label="Boat out water" /> */}
        <ReferenceLine y={boat.max_wind} label="Max" stroke="red" />
        <ReferenceLine y={boat.min_wind} label="Min" stroke="red" />
        <Line type="monotone" dataKey="windSpeed" stroke="#009ee3" activeDot={{ r: 8 }}/>
        {/* <Line type="monotone" dataKey="temperature" stroke="#009ee3"/> */}
      </LineChart>
    )
  
  }
  
  // render
  return (
    <>
    {generateChart()}
    </>
  )
}

export default HourlyChart;