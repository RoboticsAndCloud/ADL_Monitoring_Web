/*
How to use reaviz lib
Reference: https://reaviz.io/?path=/story/charts-line-chart-multi-series--simple

*/

import { NextPageContext } from 'next'
import authorizeRequest from '@middlewares/authorizeRequest'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

import dynamic from 'next/dynamic';


// import {AreaChart} from 'reaviz'

let socket

interface CorrectAnswerEvent {
    question: string
    answer: string
}

const AreaChart = dynamic(() => import("reaviz").then((mod) => mod.AreaChart), {ssr: false,});
const LineChart = dynamic(() => import("reaviz").then((mod) => mod.LineChart), {ssr: false,});
const LineSeries = dynamic(() => import("reaviz").then((mod) => mod.LineSeries), {ssr: false,});
const Line = dynamic(() => import("reaviz").then((mod) => mod.Line), {ssr: false,});
const schemes = dynamic(() => import("reaviz").then((mod) => mod.schemes), {ssr: false,});


const ADLLeaderboardTest = () => {

  const height = 450
  const width = 850
  const lineStroke = 4;

  const className = 'ADL Monitoring'

  const color = 'Accent';

  const datatest = [
    { key: new Date('11/29/2019'), data: 3 },
    { key: new Date('11/30/2019'), data: 13 },
    { key: new Date('12/1/2019'), data: 13 },
  ]

  const data2 = [
      {
        "key": "Read",
        "data": [
          {
            "key": new Date("2020-02-17 08:00:00.000"),
            "id": "0",
            "data": 7
          },
          {
            "key": new Date("2020-02-17 08:05:00.000"),
            "id": "1",
            "data": 7
          },
          {
            "key": new Date("2020-02-17 08:10:00.000"),
            "id": "2",
            "data": 7
          },
          {
            "key": new Date("2020-02-17 08:15:00.000"),
            "id": "3",
            "data": 7
          },
          // {
          //   "key": new Date("2020-02-17 08:15:01.000"),
          //   "id": "3",
          //   "data": -1
          // },
          // {
          //   "key": new Date("2020-02-17 08:29:59.000"),
          //   "id": "3",
          //   "data": -1
          // },

          // {
          //   "key": new Date("2020-02-17 08:30:00.000"),
          //   "id": "3",
          //   "data": 7
          // },
          // {
          //   "key": new Date("2020-02-17 08:35:07"),
          //   "id": "3",
          //   "data": 7
          // }
        ]
      },
      {
        "key": "Read2",
        "data": [
          {
            "key": new Date("2020-02-17 08:30:00.000"),
            "id": "3",
            "data": 7
          },
          {
            "key": new Date("2020-02-17 08:35:07"),
            "id": "3",
            "data": 7
          }
        ]
      },
      {
        "key": "Kitchen_Activity",
        "data": [
          {
            "key": new Date("2020-02-17 08:16:00.000"),
            "id": "0",
            "data": 4
          },
          {
            "key": new Date("2020-02-17 08:18:00.000"),
            "id": "1",
            "data": 4
          },
          {
            "key": new Date("2020-02-17 08:19:00.000"),
            "id": "2",
            "data": 4
          },
          {
            "key": new Date("2020-02-17 08:20:00.000"),
            "id": "3",
            "data": 4
          }
        ]
      },
      {
        "key": "Bathroom",
        "data": [
          {
            "key": new Date("2020-02-17 08:21:00.000"),
            "id": "0",
            "data": 8
          },
          {
            "key": new Date("2020-02-17 08:21:30.000"),
            "id": "1",
            "data": 8
          },
          {
            "key": new Date("2020-02-17 08:22:00.000"),
            "id": "2",
            "data": 8
          },
          {
            "key": new Date("2020-02-17 08:23:00.000"),
            "id": "3",
            "data": 8
          }
        ]
      }
    ]


  //return <div className="max-w-3xl h-full mx-auto">
  return <div
       style={{
         padding: "40px",
         boxSizing: "border-box",
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center"
       }}
     > 
   ADL Monitoring 
      
    <LineChart
      width={width}
      height={height}
      className = {className}
      series={
        <LineSeries
          type="grouped"
          line={<Line strokeWidth={lineStroke} />}
          colorScheme={color}
        />
      }
      data={data2}
    />

  </div>
  
}

// const ADLLeaderboardTest = () => {

// return <div
//  style={{
//    padding: "40px",
//    boxSizing: "border-box",
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "center",
//    alignItems: "center"
//  }}
// > 
 
//     <AreaChart
//     height={300}
//     width={300}
//     data={[
//       { key: new Date('11/29/2019'), data: 3 },
//       { key: new Date('11/30/2019'), data: 13 },
//       { key: new Date('12/1/2019'), data: 13 },
//     ]}
//   />
//   </div>
//   }

export default ADLLeaderboardTest
