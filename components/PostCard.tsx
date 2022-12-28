import React from 'react'
import { Post } from '../typing'
import Image from 'next/image'
import Link from 'next/link'
import { BsCalendar2Date } from "react-icons/bs"
import moment from 'moment'
type Props = {
  post: Post
}

const PostCard = ({ post }: Props) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className=' relative overflow-hidden shadow-md pb-80 mb-6 max-h-[200px] md:max-h-[500px]'>
        <Image
          src={post.node.featuredImage.url.toString()}
          alt="Featured Image"
          width={500}
          height={500}
          priority
          className="w-full"
        />
      </div>

      <h1 className='uppercase font-semibold transition-colors duration-100 hover:text-red-500 text-center text-xl mb-6'>
        <Link href={`/post/${post.node.slug}`}>
          {post.node.title}
        </Link>
      </h1>

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

      <p className=' tracking-wide text-center font-semibold mb-6 px-4'>
        {post.node.excerpt}
      </p>

      <div className=' text-center'>
        <Link href={`/posts/${post.node.slug.toString()}`} className=''>
          <button className=' rounded-full bg-red-500 hover:bg-red-600 hover:-translate-y-1 transition-transform duration-500 text-white p-3 px-4'>
            Continue Reading
          </button>
        </Link>
      </div>


    </div>
  )
}

export default PostCard