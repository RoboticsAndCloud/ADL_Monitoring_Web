import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Formik, Form } from 'formik';
import Field from '@components/Field';
import * as Yup from 'yup';
import axios from 'axios'
import { useRefreshProps } from '@util/routerUtil';

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

const DiagnoseMethod = ({ id, content, choices, correctAnswer}: Props) => {
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



    return   ( 
        <div className='container'>
        <div className='bg-slate-100 h16 w-screen flex  justify-center'>
        <h1 className='text-5xl text-cyan-700'>Bayesian Diagnose</h1>
        </div>

        <div className='justify-center items-center flex '>
           <h1 className='text-3xl text-cyan-700 justify-center'>Your input:</h1>
        </div>

        <div className=" flex items-center justify-center w-screen border-solid">
     
            <div className='h 56 content-center border-solid border-2 border-indigo-600'>
            <h1>Location: Kitchen</h1>
            <h1>Objects: Table</h1>
            <h1>Sound: Microwave</h1>
            <h1>Motion: Sitting</h1>
            </div>

            <div>
                <h1 className='text-3xl  text-indigo-600 hover:text-indigo-900'> => </h1>
            </div>
        
        

        {/* <div className=" flex items-center justify-center w-screen"> */}
            <div className=''>

            <button
            type="button"
            className="text-2xl  text-indigo-600 hover:text-indigo-900  border-solid border-2 border-green-500"
            onClick={() => setOpen(true)}
            >
            Bayesian Diagnose

            </button>
            </div>
        </div>
        </div>
    )

{/*         
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <Formik validationSchema={QuestionSchema} initialValues={{
                                    id,
                                    content,
                                    choices: choices || '',
                                    correctAnswer: correctAnswer || '',
                                }} onSubmit={onSubmit}>
                                    {() => (<Form>
                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <PlusCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                        Update question
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <Field type="text" name="content" label="Content" />
                                                        <Field type="text" name="choices" label="Choices (separate with |)" />
                                                        <Field type="text" name="correctAnswer" label="Correct Answer" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Form>)}
                                </Formik>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root> */}
    // </>
}

export default DiagnoseMethod