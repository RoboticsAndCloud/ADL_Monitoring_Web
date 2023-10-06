import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Formik, Form } from 'formik';
import Field from '@components/Field';
import * as Yup from 'yup';
import axios from 'axios'
import { useRefreshProps } from '@util/routerUtil';
import AppLayout from '@components/AppLayout';
import ImageUpload from '@components/ImageUpload';
import AudioUpload from '@components/AudioUpload';
import MotionUpload from '@components/MotionUpload';

const QuestionSchema = Yup.object().shape({
    content: Yup.string().min(1, 'Too short').required('Required'),
    choices: Yup.string(),
    correctAnswer: Yup.string(),
})

interface Values {
    content: string,
    choices: string,
    correctAnswer: string,
}

interface BayesResultProps {
    id: number
    activity: string
    prob: number
}



const DiagnoseMethod = ({ id, content, choices, correctAnswer}: Props) => {
    const [open, setOpen] = useState(true)
    const { refresh } = useRefreshProps()

    const AIDiagnose = () => {
        setOpen(!open);
    }

    const cancelButtonRef = useRef(null)

    const onSubmit = (values: Values) => {
        axios.put(`/api/questions/${id}`, values)
            .then(() => {
                setOpen(false)
                refresh()
            })
    }

    const [mock_bayes_result, setbayes_result] = useState<BayesResultProps[]>([
        {id: 1, activity: "Kitchen_Activity", prob:0.9},
        {id: 1, activity: "Read", prob:0.01},
        {id: 1, activity: "TV", prob:0.01},
    ]);

  

    const bayes_result : BayesResultProps = {id: 1, activity: "Kitchen_Activity", prob:0.9}


    return   <AppLayout>
    
    <div className=''>
        <h1 className="text-4xl text-green-700 text-center font-semibold">AI Diagnose Platform</h1>
        <div className="border-t-4 mb-2 mt-2 border-green-500 "></div>

        {open &&
                <div >
                    Steps: Input your data, then Click Diagnose 
                    {/* <button className="w-[15%] bg-indigo-700 font-semibold text-white py-1 px-1 rounded text-left mb-4">Input Raw Data</button>
                    <button className="w-[20%] bg-green-500 font-semibold text-white py-1 px-1 rounded text-center mb-4"> ={'>'} </button>
                    <button className="w-[40%] bg-indigo-700 font-semibold text-white py-1 px-1 rounded text-center mb-4">Recognition & Diagnose </button> */}
                </div>
        }

        <button className="mt-2 w-[100%] bg-indigo-700 font-semibold text-white py-1 px-1 rounded text-left">Raw Data</button>

        <div className="flex">
            <div className="flex-1 w-32">
                Image 
                <ImageUpload />

                {/* <img src="/image/20221001113420/image1.jpg" className="h-auto w-40" alt="Image " /> */}
            </div>
            <div className="flex-1 w-32">
                Audio
                <AudioUpload/>
                {/* <img src="https://cdna.artstation.com/p/assets/images/images/017/295/280/large/dmitriy-novikov-1.jpg?1555408172" className="h-auto w-40" alt="Image " /> */}
            </div>
            <div className="flex-1 w-32">
                Motion
                <MotionUpload/>
                {/* <img src="https://cdna.artstation.com/p/assets/images/images/017/295/280/large/dmitriy-novikov-1.jpg?1555408172" className="h-auto w-40" alt="Image " /> */}
            </div>
        </div>



        <div>
            <button className="mt-4 mb-2 w-[100%] bg-indigo-700 font-semibold text-white py-1 px-1 rounded text-left" onClick={() => AIDiagnose()}> AI Diagnose (Click to Run)</button>

{/* 
            <p> Objects: Cup(90%) </p>
            <p> Sound: Microwave(90%) </p>
            <p> Motion: Stand(95%) </p>  */}
            {/* <p className={{open} ? 'bg-blue-400': 'bg-red-400'}>abc</p> */}

            <div className="flex flex-row  justify-center items-center">
                <table className="table-auto text-left border text-sm ">
                <thead>
                <tr>
                    <th className="p-2 bg-indigo-400 border-b border-l">Type</th>
                    <th className="p-2 bg-indigo-400 border-b border-l">Top1</th>
                    <th className="p-2 bg-indigo-400 border-b border-l">Top2</th>
                    <th className="p-2 bg-indigo-400 border-b border-l">Top3</th>
                </tr>
                </thead>
                <tbody>
                <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l">Location</td>
                    <td className="p-2 border-b border-l">Kitchen(90%)</td>
                    <td className="p-2 border-b border-l">LivingRoom(1%)</td>
                    <td className="p-2 border-b border-l">Bedroom(0.1%)</td>
                </tr>
                <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l">Object</td>
                    <td className="p-2 border-b border-l">Cup(90%)</td>
                    <td className="p-2 border-b border-l">Microwave(90%)</td>
                    <td className="p-2 border-b border-l">Table(90%)</td>
                </tr>
                <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l">Sound</td>
                    <td className="p-2 border-b border-l">Microwave(90%)</td>
                    <td className="p-2 border-b border-l">Drinking(1%)</td>
                    <td className="p-2 border-b border-l">Eating(0.1%)</td>
                </tr>
                <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l">Motion</td>
                    <td className="p-2 border-b border-l">Stand(90%)</td>
                    <td className="p-2 border-b border-l">Walk(1%)</td>
                    <td className="p-2 border-b border-l">Sit(0.1%)</td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>


        <div>
            <button className="mt-2 mb-1 w-[100%] bg-indigo-700 font-semibold text-white py-1 px-1 rounded text-left"> Bayesian Diagnose (Click to Run)</button>
            <span className="bg-sky-400" >Baysian Process:</span>
            <div className='flex  justify-center items-center'>
            <img src="https://www.freecodecamp.org/news/content/images/2020/07/Screenshot-2020-07-19-at-22.58.48.png" />
            </div>
            <span className="bg-sky-400">Baysian Result (Top3):</span>
            <div className="flex flex-row  justify-center items-center">
                <table className="table-auto text-left border text-sm ">
                <thead>
                <tr>
                    <th className="p-4 bg-indigo-400 border-b border-l">Activity</th>
                    <th className="p-4 bg-indigo-400 border-b border-l">Probability</th>
                </tr>
                </thead>
                <tbody>
                {mock_bayes_result.map((bayes_result) => (
                    <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                        <td className="p-4 border-b border-l">{bayes_result.activity}</td>
                        <td className="p-4 border-b border-l">{bayes_result.prob}</td>
                    </tr>
                ))
                }
                {/* 
                <tr className="odd:bg-red-400 hover:!bg-stone-200">
                    <td className="p-4 border-b border-l">{bayes_result.activity}</td>
                    <td className="p-4 border-b border-l">{bayes_result.prob}</td>
                </tr>
                <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                    <td className="p-4 border-b border-l">Reading</td>
                    <td className="p-4 border-b border-l">0.8</td>
                </tr>
                <tr className="odd:bg-gray-200 hover:!bg-stone-200">
                    <td className="p-4 border-b border-l">Watch TV</td>
                    <td className="p-4 border-b border-l">0.1</td>
                </tr> */}

                </tbody>
                </table>
            </div>
        </div>

        <div className="border-t-4 mb-2 mt-2 border-green-500 "></div>
    </div>
       
    </AppLayout>
}

export default DiagnoseMethod



