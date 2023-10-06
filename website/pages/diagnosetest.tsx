import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Formik, Form } from 'formik';
import Field from '@components/Field';
import * as Yup from 'yup';
import axios from 'axios'
import { useRefreshProps } from '@util/routerUtil';
import ImageUpload from '@components/ImageUpload';
import AppLayout from '@components/AppLayout';

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

interface Props {
    id: number
    content: string
    choices?: string
    correctAnswer?: string
}


const ImageUploadPage: React.FC = () => {
    return (
      <div className="container" style={{ width: "600px" }}>
        <div className="my-3">
          <h3>bezkoder.com</h3>
          <h4>React Typescript Image Upload</h4>
        </div>
  
        <ImageUpload />
      </div>
    );
  }
  
const DiagnoseMethodTest = ({ id, content, choices, correctAnswer}: Props) => {
    const [open, setOpen] = useState(false)
    const { refresh } = useRefreshProps()

    const cancelButtonRef = useRef(null)

    const onSubmit = (values: Values) => {
        axios.put(`/api/questions/${id}`, values)
            .then(() => {
                setOpen(false)
                refresh()
            })
    }

    // return <>

    return <AppLayout>
        <ImageUploadPage></ImageUploadPage>
        
        </AppLayout>



    // return   ( 
    //     <div className='container'>
    //     <div className='bg-slate-100 h16 w-screen flex  justify-center whitespace-pre'>
    //     <h1 className='text-5xl text-cyan-700'>Bayesian Diagnose</h1>
    //     </div>

    //     <div className='justify-center items-center flex '>
    //        <h1 className='text-3xl text-cyan-700 justify-center'>Your input:</h1>
    //     </div>

    //     <div className=" flex items-center justify-center w-screen border-solid">
     
    //         <div className='h 56 content-center border-solid border-2 border-indigo-600'>
    //         <h1>Location: Kitchen</h1>
    //         <h1>Objects: Table</h1>
    //         <h1>Sound: Microwave</h1>
    //         <h1>Motion: Sitting</h1>
    //         </div>

    //         <div>
    //             <h1 className='text-3xl  text-indigo-600 hover:text-indigo-900'> => </h1>
    //         </div>
        
        

    //     {/* <div className=" flex items-center justify-center w-screen"> */}
    //         <div className=''>

    //         <button
    //         type="button"
    //         className="text-2xl  text-indigo-600 hover:text-indigo-900  border-solid border-2 border-green-500"
    //         onClick={() => setOpen(true)}
    //         >
    //         Bayesian Diagnose <br></br>
    //         (Click to Run)

    //         </button>
    //         </div>

    //         <div>
    //             <h1 className='text-3xl  text-indigo-600 hover:text-indigo-900'> => </h1>
    //         </div>

    //         <div className='h 56 content-center border-solid border-2 border-indigo-600'>
    //         <h1>Result: Kitchen Activity</h1>

    //         </div>

    //     </div>
    //     </div>
    // )

}

export default DiagnoseMethodTest