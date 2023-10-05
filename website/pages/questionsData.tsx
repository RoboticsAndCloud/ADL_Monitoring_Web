import { NextPage } from 'next';
import AppLayout from '@components/AppLayout';
import authorizeRequest from '@middlewares/authorizeRequest'
import prisma from '@util/prisma';
import CreateQuestion from '@components/CreateQuestion';
import axios from 'axios';
import { useRefreshProps } from '@util/routerUtil';
import UpdateQuestion from '@components/UpdateQuestion';
import { cursorTo } from 'readline';

import { DOMAttributes, useContext, useEffect } from "react";

import { useState } from 'react'
import DatePicker from "react-datepicker";
import { createGlobalState } from 'react-use';
import "react-datepicker/dist/react-datepicker.css";
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

// var date_str = '2009-12-11'
var date_str = new Date().toJSON().split('T')[0]


// function setDataFun(startDate) {
  
//   date_str = startDate.toJSON().split('T')[0]
//   return date_str
// }

const QuestionsData: NextPage<QuestionsProps> = ({ questions }) => {
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

  return questions

}

export const getServerSideProps = authorizeRequest(async () => {
  let questions = await prisma.adl_activity_data.findMany({
    where: {
      time: {
        // gte: new Date('2009-12-11'),
        // lte: new Date('2009-12-12')
        // startDate.toJSON().split('T')[0]
        gte: new Date('2022-09-11'),
        lte: new Date('2022-10-12')
        // gte: new Date(date_str),
        // lte: new Date('2022-10-12')
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


export default QuestionsData

// display the images /home/ascc/LF_Workspace/Bayes_model/Product_ADL/ADL_HMM_BAYES/ascc_data/image/20220925172418/
// https://flowbite.com/docs/components/tables/