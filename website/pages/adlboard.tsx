/*
How to use reaviz lib
Reference: https://reaviz.io/?path=/story/charts-line-chart-multi-series--simple

*/

import { NextPageContext } from 'next'
import authorizeRequest from '@middlewares/authorizeRequest'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { GetServerSidePropsContext } from 'next'

// import * as format from 'data-fns/format'

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


// const ADLLeaderboardTest = () => {

//   const height = 450
//   const width = 850
//   const lineStroke = 4;

//   const className = 'ADL Monitoring'

//   const color = 'Accent';

//   const datatest = [
//     { key: new Date('11/29/2019'), data: 3 },
//     { key: new Date('11/30/2019'), data: 13 },
//     { key: new Date('12/1/2019'), data: 13 },
//   ]

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
          //   "data": 0
          // },
          // {
          //   "key": new Date("2020-02-17 08:29:59.000"),
          //   "id": "3",
          //   "data": -1
          // },

          // {
          //   "key": new Date("2020-02-17 08:35:07"),
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


//   //return <div className="max-w-3xl h-full mx-auto">
//   return <div
//        style={{
//          padding: "40px",
//          boxSizing: "border-box",
//          display: "flex",
//          flexDirection: "column",
//          justifyContent: "center",
//          alignItems: "center"
//        }}
//      > 
//    ADL Monitoring 
      
//     <LineChart
//       width={width}
//       height={height}
//       className = {className}
//       series={
//         <LineSeries
//           type="grouped"
//           line={<Line strokeWidth={lineStroke} />}
//           colorScheme={color}
//         />
//       }
//       data={data2}
//     />

//   </div>
  
// }

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

import { NextPage } from 'next';
import AppLayout from '@components/AppLayout';
import prisma from '@util/prisma';
import CreateQuestion from '@components/CreateQuestion';
import axios from 'axios';
import { useRefreshProps } from '@util/routerUtil';
import UpdateQuestion from '@components/UpdateQuestion';
import { cursorTo } from 'readline';

import { DOMAttributes } from "react";

interface QuestionsProps {
  questions: {
    id: bigint;
    activity: string;
    time: Date
    image_source?: string
    sound_source?: string
    motion_source?: string
    object_source?: string
    comment_source?: string
  }[];
}

const ADLLeaderboard: NextPage<QuestionsProps> = ({ questions }) => {
  const { refresh } = useRefreshProps()

  const deleteQuestion = (id: number) => {
    axios.delete(`/api/questions/${id}`).then(() => {
      refresh()
    })
  }

  const showImage = (cur_time: string) => {

    // window.open('/image_sample/image0.jpg')
    // ('%Y%m%d%hh%M%ss')
    cur_time=cur_time.replaceAll('-', '')
    cur_time=cur_time.replaceAll('T', '')
    cur_time=cur_time.replaceAll(':', '')
    cur_time=cur_time.replaceAll('.000Z', '')


    var path = '/image/' + cur_time + '/image1.jpg'

    window.open(path)


    // window.open('https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2768&q=80')

  }



const ACTIVITY_BED_TO_TOILET  = 'Bed_to_Toilet'
const ACTIVITY_MORNING_MEDS = 'Morning_Meds'
const ACTIVITY_WATCH_TV = 'Watch_TV'
const ACTIVITY_KITCHEN = 'Kitchen_Activity'
const ACTIVITY_CHORES = 'Chores'
const ACTIVITY_LEAVE_HOME = 'Leave_Home'
const ACTIVITY_READ = 'Read'
const ACTIVITY_GUEST_BATHROOM = 'Guest_Bathroom'
const ACTIVITY_MASTER_BATHROOM = 'Master_Bathroom'
const ACTIVITY_DESK_ACTIVITY = 'Desk_Activity'
const ACTIVITY_EVE_MEDS = 'Eve_Meds'
const ACTIVITY_MEDITATE = 'Meditate'
const ACTIVITY_DINING_RM_ACTIVITY = 'Dining_Rm_Activity'
const ACTIVITY_MASTER_BEDROOM = 'Master_Bedroom_Activity'
const ACTIVITY_SLEEP = 'Sleep'

  const ACTIVITY_DICT_INDEX = new Map([
  [ACTIVITY_BED_TO_TOILET , 1],
  [ACTIVITY_MORNING_MEDS , 2],
  [ACTIVITY_WATCH_TV , 3],
  [ACTIVITY_KITCHEN , 4],
  [ACTIVITY_CHORES , 5],
  [ACTIVITY_LEAVE_HOME , 6],
  [ACTIVITY_READ , 7],
  [ACTIVITY_GUEST_BATHROOM , 8],
  [ACTIVITY_MASTER_BATHROOM , 9],
  [ACTIVITY_DESK_ACTIVITY , 10],
  [ACTIVITY_EVE_MEDS , 11],
  [ACTIVITY_MEDITATE , 12],
  [ACTIVITY_DINING_RM_ACTIVITY , 13],
  [ACTIVITY_MASTER_BEDROOM , 14]
  ])

  // const activity_dict_index_map = new Map()

  
  
  const ACTIVITY_DICT = {
  ACTIVITY_BED_TO_TOILET : 'Bed_to_Toilet',
  ACTIVITY_MORNING_MEDS : 'Morning_Meds',
  ACTIVITY_WATCH_TV : 'Watch_TV',
  ACTIVITY_KITCHEN : 'Kitchen_Activity',
  ACTIVITY_CHORES : 'Chores',
  ACTIVITY_LEAVE_HOME : 'Leave_Home',
  ACTIVITY_READ : 'Read',
  ACTIVITY_GUEST_BATHROOM : 'Guest_Bathroom',
  ACTIVITY_MASTER_BATHROOM : 'Master_Bathroom',
  ACTIVITY_DESK_ACTIVITY : 'Desk_Activity',
  ACTIVITY_EVE_MEDS : 'Eve_Meds',
  ACTIVITY_MEDITATE : 'Meditate',
  ACTIVITY_DINING_RM_ACTIVITY : 'Dining_Rm_Activity',
  ACTIVITY_MASTER_BEDROOM : 'Master_Bedroom_Activity'
  }

  var result:any[] = []
  var Read_dict = {key: ACTIVITY_READ, data:result};
  var res_dict:any = {}
  var activity_data = new Map();

  const OBJ_KEY = 'key'
  const OBJ_ID = 'id'
  const OBJ_DATA = 'data'

  var pre_activity = ''

  var pre_obj = {'key': new Date(), 'id':0, 'data': 0}


  var activity_uniq_number = new Map([
    [ACTIVITY_BED_TO_TOILET , -1],
    [ACTIVITY_MORNING_MEDS , -1],
    [ACTIVITY_WATCH_TV , -1],
    [ACTIVITY_KITCHEN , -1],
    [ACTIVITY_CHORES , -1],
    [ACTIVITY_LEAVE_HOME , -1],
    [ACTIVITY_READ , -1],
    [ACTIVITY_GUEST_BATHROOM , -1],
    [ACTIVITY_MASTER_BATHROOM , -1],
    [ACTIVITY_DESK_ACTIVITY , -1],
    [ACTIVITY_EVE_MEDS , -1],
    [ACTIVITY_MEDITATE , -1],
    [ACTIVITY_DINING_RM_ACTIVITY , -1],
    [ACTIVITY_MASTER_BEDROOM , -1]
    ])

    // questions.forEach(function(question) {
    //   if(activity_data.has(question.activity)) {

    //     // Read_dict = activity_data.get(ACTIVITY_WATCH_TV)
  
    //     let tmp_dict = activity_data.get(question.activity)
      
    //     let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
    //     let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': ACTIVITY_DICT_INDEX.get(question.activity)}
    //     tmp_dict["data"].push(new_obj)
    //     activity_data.set(question.activity, tmp_dict)
  
    //   } else{

    //     let a_dict = {
    //       "key": question.activity,
    //       "data": []
    //     }
    //     activity_data.set(question.activity, a_dict)
  
    //     let tmp_dict = activity_data.get(question.activity)
      
    //     let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
    //     let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': ACTIVITY_DICT_INDEX.get(question.activity)}
    //     tmp_dict["data"].push(new_obj)
    //     activity_data.set(question.activity, tmp_dict)
  
    //   }
    // })


  questions.forEach(function(question) {

      if(activity_data.has(question.activity)) {


        let tmp_dict = activity_data.get(pre_activity)
        let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
        let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': pre_obj.data}
        tmp_dict["data"].push(new_obj)
        activity_data.set(pre_activity, tmp_dict)


        let tmp = activity_uniq_number.get(question.activity)! + 1
        activity_uniq_number.set(question.activity, tmp)
        pre_activity = question.activity + activity_uniq_number.get(question.activity)

        let a_dict = {
          "key": pre_activity,
          "data": []
        }
        activity_data.set(pre_activity, a_dict)

        tmp_dict = activity_data.get(pre_activity)
      
        t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
        new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': ACTIVITY_DICT_INDEX.get(question.activity)!}
        tmp_dict["data"].push(new_obj)
        activity_data.set(pre_activity, tmp_dict)

        pre_activity = pre_activity
        pre_obj = new_obj
  
      } else{

        let a_dict = {
          "key": question.activity,
          "data": []
        }
        activity_data.set(question.activity, a_dict)
  
        let tmp_dict = activity_data.get(question.activity)
      
        let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
        var index = ACTIVITY_DICT_INDEX.get(question.activity)!
        
        let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': index}
        tmp_dict["data"].push(new_obj)
        activity_data.set(question.activity, tmp_dict)

        if (pre_activity != '') {
          let tmp_dict = activity_data.get(pre_activity)
      
          let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
          
          let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': pre_obj.data}
          tmp_dict["data"].push(new_obj)
          activity_data.set(pre_activity, tmp_dict)
        }
        pre_activity = question.activity
        pre_obj = new_obj
  
      }
    })


  // questions.forEach(function(question) {

    
  //   if(activity_data.has(question.activity + activity_uniq_number.get(question.activity))) {

  //     // Read_dict = activity_data.get(ACTIVITY_WATCH_TV)
  //     if (pre_activity === (question.activity + activity_uniq_number.get(question.activity))) {
  //       let tmp_dict = activity_data.get(pre_activity)
    
  //       let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
  //       let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': ACTIVITY_DICT_INDEX.get(question.activity)}
  //       tmp_dict["data"].push(new_obj)
  //       activity_data.set(pre_activity, tmp_dict)
  //     } else {

  //       let tmp = activity_uniq_number.get(question.activity) + 1
  //       activity_uniq_number.set(question.activity, tmp)
  //       pre_activity = question.activity + activity_uniq_number.get(question.activity)

  //       let a_dict = {
  //         "key": pre_activity,
  //         "data": []
  //       }
  //       activity_data.set(pre_activity, a_dict)

  //       let tmp_dict = activity_data.get(pre_activity)
    
  //       let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
  //       let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': ACTIVITY_DICT_INDEX.get(question.activity)}
  //       tmp_dict["data"].push(new_obj)
  //       activity_data.set(pre_activity, tmp_dict)
  //     }

  //   } else{


  //     let tmp = activity_uniq_number.get(question.activity) + 1
  //     activity_uniq_number.set(question.activity, tmp)
  //     pre_activity = question.activity + activity_uniq_number.get(question.activity)

  //     let a_dict = {
  //       "key": pre_activity,
  //       "data": []
  //     }
  //     activity_data.set(pre_activity, a_dict)

  //     let tmp_dict = activity_data.get(pre_activity)
    
  //     let t = new Date(JSON.stringify(question.time).replace("T", " ").replace('Z', ''))
  //     let new_obj = {'key': t, 'id':(tmp_dict["data"].length+1).toString(), 'data': ACTIVITY_DICT_INDEX.get(question.activity)}
  //     tmp_dict["data"].push(new_obj)
  //     activity_data.set(pre_activity, tmp_dict)

  //   }

  // })
  
  //             "key": new Date("2020-02-17 08:22:00.000"),
 
  // Generate data to render the figure
  const adl_board_data = new Array()
  for (let k of Array.from(activity_data.keys())) {
    adl_board_data.push(activity_data.get(k))
    
  }
  

  // Read_dict = activity_data.get(ACTIVITY_READ)

  const height = 450
  const width = 850
  const lineStroke = 4;

  const className = 'ADL Monitoring'

  const color = 'Accent';

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
    
    {/* {adl_board_data[0].data.length}, */}
    <br/><br/>


     {/* { new Date('11/29/2019').toJSON().replace("T", " ").replace('Z', '')}, {JSON.stringify(new Date('11/29/2019')).replace("T", " ").replace('Z', '')} */}
      
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
      data={adl_board_data}
      // data = {data2}
    />
  
  [ACTIVITY_BED_TO_TOILET , 1],
  [ACTIVITY_MORNING_MEDS , 2],
  [ACTIVITY_WATCH_TV , 3],
  [ACTIVITY_KITCHEN , 4],
  [ACTIVITY_CHORES , 5],
  [ACTIVITY_LEAVE_HOME , 6],
  [ACTIVITY_READ , 7],
  [ACTIVITY_GUEST_BATHROOM , 8],
  [ACTIVITY_MASTER_BATHROOM , 9],
  [ACTIVITY_DESK_ACTIVITY , 10],
  [ACTIVITY_EVE_MEDS , 11],
  [ACTIVITY_MEDITATE , 12],
  [ACTIVITY_DINING_RM_ACTIVITY , 13],
  [ACTIVITY_MASTER_BEDROOM , 14]

  </div>


  // return <AppLayout>
  //   {/* <div className="flex justify-end">
  //     <CreateQuestion />
  //   </div> */}

  //   <div className="flex flex-col mt-3">
  //     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  //       <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
  //         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  //           <table className="min-w-full divide-y divide-gray-200">
  //             <thead className="bg-gray-50">
  //               <tr>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Activity
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Time
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Location
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Sound
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Motion
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Object
  //                 </th>

  //                 <th scope="col" className="relative px-6 py-3">
  //                   <span className="sr-only">Actions</span>
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {questions.map((question, questionIdx) => (
  //                 <tr key={question.id} className={questionIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.activity}</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.time}</td>
  //                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <a id="imageLink" href="#" onClick={ ()=> showImage(question.time)}>{question.image_source?.split(":")[0]} </a></td> */}
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline"> <a id="imageLink" href="#" onClick={ ()=> showImage(question.time)}>{question.image_source?.split(":")[0]} </a></td>

  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.sound_source}</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.motion_source}</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.object_source}</td>
  //                   {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  //                     <UpdateQuestion {...question} />
  //                     <button onClick={() => deleteQuestion(question.id)} className="ml-1 text-red-600 hover:text-indigo-900">
  //                       Delete
  //                     </button>
  //                   </td> */}
  //                 </tr>
  //               ))}

  //     {Read_dict.key}, Len:{Read_dict.data.length}, adl_len:{adl_board_data.length}

  //     {/* {Read_dict.data.forEach(function(obj){ */}

  //       {Read_dict.data.map((obj, questionIdx) => (
  //       <tr key={obj.OBJ_ID} className={'bg-gray-50'}>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obj.OBJ_KEY}</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obj.OBJ_ID}</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obj.OBJ_DATA}</td>
  //         </tr>
  //     ))}

  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>

  //   </div>
  // </AppLayout>
}

export const getServerSideProps = authorizeRequest(async ({ req, res }: GetServerSidePropsContext) => {
  var cookie_date_str = req.cookies.cookie_date_str 
  if(cookie_date_str == null) {
    cookie_date_str = "2022-09-25"
  }
  cookie_date_str = "2022-09-25"
  let next_day = new Date(cookie_date_str)
  next_day.setDate(next_day.getDate()+1)
  let questions = await prisma.adl_activity_data.findMany({
    where: {
      time: {
        // gte: new Date('2009-12-11'),
        // lte: new Date('2009-12-12')

        gte: new Date(cookie_date_str),
        lte: next_day
      }
    },
    orderBy: {
        id: 'asc'
    },
    select: {
      id: true,
      activity: true,
      time: true,
      image_source: true,
      sound_source: true,
      motion_source: true,
      object_source: true
    }
  })
  /**questions = JSON.parse(JSON.stringify(questions)) */
  questions = JSON.parse(JSON.stringify(questions, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));

  return {
    props: {
      questions
    }
  }
})


// display the images /home/ascc/LF_Workspace/Bayes_model/Product_ADL/ADL_HMM_BAYES/ascc_data/image/20220925172418/
// https://flowbite.com/docs/components/tables/

export default ADLLeaderboard
