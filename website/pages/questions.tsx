import { NextPage } from 'next';
import AppLayout from '@components/AppLayout';
import authorizeRequest from '@middlewares/authorizeRequest'
import prisma from '@util/prisma';
import CreateQuestion from '@components/CreateQuestion';
import axios from 'axios';
import { useRefreshProps } from '@util/routerUtil';
import UpdateQuestion from '@components/UpdateQuestion';

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

const Questions: NextPage<QuestionsProps> = ({ questions }) => {
  const { refresh } = useRefreshProps()

  const deleteQuestion = (id: number) => {
    axios.delete(`/api/questions/${id}`).then(() => {
      refresh()
    })
  }

  const showImage = (id: number) => {
    window.open('https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2768&q=80')
  }

  return <AppLayout>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <a id="imageLink" href="#" onClick={ ()=> showImage(1)} >{question.image_source?.split(":")[0]} </a></td>
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

export const getServerSideProps = authorizeRequest(async () => {
  let questions = await prisma.adl_activity_data.findMany({
    where: {
      time: {
        gte: new Date('2009-12-11'),
        lte: new Date('2009-12-12')
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
