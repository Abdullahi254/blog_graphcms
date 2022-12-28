import React, { useState, useEffect, createRef } from 'react'
import { submitComment } from "../services"

type Props = {
    slug: String
}
type Comment = {
    comment: String
    name: String
    email: String
    slug: String
}

const CommentForm = ({ slug }: Props) => {
    const [error, setError] = useState<boolean>(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const commentInput = createRef<HTMLTextAreaElement>()
    const nameInput = createRef<HTMLInputElement>()
    const emailInput = createRef<HTMLInputElement>()
    const storeDataInput = createRef<HTMLInputElement>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(false)
        const comment = commentInput.current?.value
        const name = nameInput.current?.value
        const email = emailInput.current?.value
        const storeData = storeDataInput.current?.checked
        if (typeof (comment) === "undefined" || typeof (name) === "undefined" || typeof (email) === "undefined") {
            setError(true)
            return
        }

        const commentObj: Comment = {
            comment,
            name,
            email,
            slug
        }
        if (typeof (storeData) === "boolean") {
            window.localStorage.setItem("name", name)
            window.localStorage.setItem("email", email)
        } else {
            window.localStorage.removeItem('name')
            window.localStorage.removeItem('email')
        }

        submitComment(commentObj).then(res=>{
            setShowSuccessMessage(true)
            setTimeout(()=>{
                setShowSuccessMessage(false)
            },3000)
        })

    }
    return (
        <form
            className=' bg-white rounded-lg p-6 shadow-md mb-8 flex flex-col'
            onSubmit={handleSubmit}
        >
            <h3 className=' font-semibold uppercase mb-4 py-2  border-b-2'>Send Comment</h3>
            <textarea
                className='p-4 py-8 border-2 border-gray-300 text-sm text-gray-900 bg-gray-50 rounded-md mb-4'
                placeholder='Comment'
                ref={commentInput}
            />
            <input
                className='p-4 border-2 border-gray-300 text-sm text-gray-900 bg-gray-50 rounded-md mb-4'
                placeholder='Name'
                ref={nameInput}
            />
            <input
                className='p-4 border-2 border-gray-300 text-sm text-gray-900 bg-gray-50 rounded-md mb-4'
                placeholder='Email'
                type="email"
                ref={emailInput}
            />
            <div className='mb-4 p-2 flex items-center'>
                <input type="checkbox" ref={storeDataInput} id="storeData" name='storeData' value="true" />
                <label className=' text-xs cursor-pointer ml-2' htmlFor='storeData'>Save E-mail and Name</label>
            </div>
            {showSuccessMessage && <p className='text-xs text-green-500 mb-4'>Comment submitted for review.</p>}
            {error && <p className='text-xs text-red-500 mb-4'>All fields must be filled! </p>}
            <button
                type='submit'
                className='w-[25%] py-3 rounded-lg bg-red-500 uppercase text-white text-sm
                hover:bg-red-800 mb-4'>
                send 
            </button>
        </form>
    )
}

export default CommentForm