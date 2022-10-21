import { NextPage } from 'next';
import AppLayout from '@components/AppLayout';
import authorizeRequest from '@middlewares/authorizeRequest'
import prisma from '@util/prisma';
import CreateQuestion from '@components/CreateQuestion';
import axios from 'axios';
import { useRefreshProps } from '@util/routerUtil';
import UpdateQuestion from '@components/UpdateQuestion';
import { GetServerSidePropsContext } from 'next'

import { cursorTo } from 'readline';

import { DOMAttributes, useContext, useEffect } from "react";

import cookie from "react-cookies"
// import {useCookies} from "react-cookies"


import { useState } from 'react'
import DatePicker from "react-datepicker";
import { createGlobalState } from 'react-use';
import "react-datepicker/dist/react-datepicker.css";
import { request } from 'http';
// Date picker https://www.geeksforgeeks.org/how-to-add-simple-datepicker-in-next-js/

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

let inOneday = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天

var in_ten_mins = new Date(new Date().getTime()+600*1000)
var tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate()+1)

// var date_str = '2009-12-11'

// var date_str = new Date().toJSON().split('T')[0]
// cookie.remove("cookie_date_str")
var date_str = cookie.load("cookie_date_str")

if(date_str == null){
  date_str = new Date().toJSON().split('T')[0]
  date_str = '2020-12-12'
  cookie.save("cookie_date_str", date_str,{path:"/", expires:tomorrow});
} else {
  // date_str = JSON.stringify(date_str)
  // date_str = '2008-12-11'
  // date_str = '2020-12-11'
  // cookie.save("cookie_date_str", date_str,{path:"/", expires:tomorrow});
}


const Questions: NextPage<QuestionsProps> = ({ questions }) => {
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
  }

  const [startDate, setStartDate] = useState(new Date());


  // const [setCookie] = useCookies(["cookie_date_str"])
//   useEffect(() => {
//     // if (cookie.load("cookie_date_str")) {
//     //   date_str = cookie.load("cookie_date_str")
//     //   // date_str = '2009-12-10'

//     // } else {
//     //   date_str = '2009-12-11'
//     // }
//     cookie.save("cookie_date_str", date_str,{path:"/", expires:inOneday});
// }, [startDate]);



  return <AppLayout>
  <div>
    <h4>  Date:</h4>
    <DatePicker selected={startDate} onChange=
            {(date) => {setStartDate(date); date_str = date.toJSON().split('T')[0];window.sessionStorage.setItem("date_str", date_str);
            cookie.save("cookie_date_str", date_str,{path:"/", expires:tomorrow});
            refresh()}} />
  </div>
  <div>
  </div>


    <div className="flex justify-end">
      <CreateQuestion />
    </div>
    <div className="flex flex-col mt-3">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Activity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sound
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Motion
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Object
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, questionIdx) => (
                  <tr key={question.id} className={questionIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.activity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.time}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <a id="imageLink" href="#" onClick={ ()=> showImage(question.time)}>{question.image_source?.split(":")[0]} </a></td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline"> <a id="imageLink" href="#" onClick={ ()=> showImage(question.time)}>{question.image_source?.split(":")[0]} </a></td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.sound_source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.motion_source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.object_source}</td>


                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <UpdateQuestion {...question} />
                      <button onClick={() => deleteQuestion(question.id)} className="ml-1 text-red-600 hover:text-indigo-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
}



export const getServerSideProps = authorizeRequest(async ({ req, res }: GetServerSidePropsContext) => {

  let cookie_date_str = req.cookies.cookie_date_str 
  console.log("in getServerSideProps cookie_date_str:", cookie_date_str)
  console.log("cookie_date_str from server:", cookie_date_str.length)
  let next_day = new Date(cookie_date_str)
  next_day.setDate(next_day.getDate()+1)
  let cookie_day = new Date(cookie_date_str)
  cookie_day.setDate(cookie_day.getDate()-2)

  let questions = await prisma.adl_activity_data.findMany({
    where: {
      time: {
        // gte: new Date('2009-12-11'),
        // lte: new Date('2009-12-12')
        // startDate.toJSON().split('T')[0]
        // gte: new Date('2022-09-11'),
        // lte: new Date('2022-10-12')
        gte: cookie_day,
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


export default Questions

// display the images /home/ascc/LF_Workspace/Bayes_model/Product_ADL/ADL_HMM_BAYES/ascc_data/image/20220925172418/
// https://flowbite.com/docs/components/tables/
