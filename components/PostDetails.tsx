import Image from 'next/image'
import React from 'react'
import { Post } from '../typing'
import { BsCalendar2Date } from "react-icons/bs"
import moment from 'moment'

type Props = {
    post: Post
}

const PostDetails = ({ post }: Props) => {
    return (
        <div className=' bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className=' relative overflow-hidden shadow-md mb-6 max-h-[500px]'>
                <Image
                    src={post.node.featuredImage.url.toString()}
                    alt={post.node.title.toString()}
                    priority
                    width={500}
                    height={500}
                    className=" object-top h-full w-full rounded-t-lg"
                />
            </div>

            <div className=' flex justify-evenly items-center mb-6'>
                <div className='flex items-center'>
                    <Image
                        src={post.node.author.photo.url.toString()}
                        alt={post.node.author.name.toString()}
                        width={50}
                        height={50}
                        className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full mr-2"
                    />
                    <span className=' text-sm md:text-base'>
                        {post.node.author.name}
                    </span>
                </div>
                <div className='flex items-center'>
                    <BsCalendar2Date className=' text-[24px] mr-2 text-red-500' />
                    <span className='text-sm md:text-base'>
                        {moment(post.node.createdAt).format('DD MMM, YYYY')}
                    </span>
                </div>
            </div>

            <h3 className='mb-6 text-2xl md:text-3xl font-semibold text-center underline'>
                {post.node.title}
            </h3>

            
                {post.node.content.text.split("\\n").map((p,index)=>
                    <p key={index} className="mb-2 tracking-wide text-center px-4 md:px-6 lg:px-0 md:text-left">
                        {p}
                    </p>
                )}
        </div>
    )
}

export default PostDetails