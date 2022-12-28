import Image from 'next/image'
import React from 'react'
import { Post } from '../typing'

type Props = {
    post: Post
}

const Author = ({ post }: Props) => {
    return (
        <div className=' text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
            <div className=' absolute left-[38%] md:left-[43%] lg:left-[42%] xl:left-[45%] -top-14'>
                <Image
                    src={post.node.author.photo.url.toString()}
                    alt={post.node.author.name.toString()}
                    width={100}
                    height={100}
                    className=" align-middle rounded-full h-[100px] w-[100px]"
                />
            </div>
            <h3 className=' text-white my-4 text-xl font-bold uppercase'>{post.node.author.name}</h3>
            <p className=' text-white text-lg'>{post.node.author.bio}</p>
        </div>
    )
}

export default Author