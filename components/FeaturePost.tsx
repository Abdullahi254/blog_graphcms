import Image from 'next/image'
import React from 'react'
import { FeaturedPost} from '../typing'
import moment from 'moment'

type Props = {
    post: FeaturedPost
}

const FeaturePost = ({ post }: Props) => {
    return (
        <div className='relative group cursor-pointer'>
            <Image
                src={post.featuredImage.url.toString()}
                alt={post.title.toString()}
                width={500}
                height={500}
                priority
                className=" h-[200px] w-[200px] xl:h-[300px] xl:w-[320px] opacity-40 group-hover:opacity-70"
            />

            <span className='top-1 xl:top-3 absolute z-10 w-[200px] xl:w-[320px] flex justify-center items-center text-white'>
                {moment(post.updatedAt).format('DD MMM, YYYY')}
            </span>

            <div className='absolute z-10 top-[20%] w-[200px] xl:w-[320px] px-2'>
                <p className=' text-white font-semibold text-center text-lg'>
                    {post.title}
                </p>
            </div>

            <div className=' bottom-1 xl:bottom-3 absolute z-10 w-[200px] xl:w-[320px] flex justify-center items-center'>
                <Image
                    priority
                    src={post.author.photo.url.toString()}
                    alt={post.author.name.toString()}
                    width={50}
                    height={50}
                    className="w-[30px] h-[30px] rounded-full mr-2"
                />
                <span className=' text-sm text-white'>
                    {post.author.name}
                </span>
            </div>


        </div>
    )
}

export default FeaturePost