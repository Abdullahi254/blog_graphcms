import React from 'react'
import moment from 'moment'
import parse from "html-react-parser"
import { CommentType } from '../typing'

type Props = {
    comments: CommentType[]
}

const Comments = ({comments}: Props) => {
    const commentsCount = 4
  return (
    <div className='bg-white rounded-lg p-6 shadow-md mb-8 flex flex-col'>
        <h3 className=' font-semibold uppercase mb-4 py-2  border-b-2'>Comments<span className='ml-1'>({comments.length})</span></h3>
        {
            comments.map((comment,index)=>
                <div key={index} className="p-4 py-8 border-1 shadow-sm border-gray-300 bg-gray-50 rounded-md mb-4">
                    <div className='px-4 mb-4'>
                        <p className='inline-block text-sm uppercase font-semibold'>{comment.name}</p>
                        <span className='text-sm ml-2'>{moment(comment.createdAt).format('DD MMM, YYYY')}</span>
                    </div>
                    <p className='px-4 text-sm tracking-wide text-left'>
                    {comment.comment}
                    </p>
                </div>
            )
        }
    </div>
  )
}

export default Comments