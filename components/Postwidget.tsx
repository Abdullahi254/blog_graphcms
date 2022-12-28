import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { RecentPost } from '../typing'
import { useRouter } from 'next/router'
import Image from 'next/image'
type Props = {
  recentPosts: RecentPost[]
  similarPosts: RecentPost[]
}

const Postwidget = ({ recentPosts, similarPosts, }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<RecentPost[]>(recentPosts)
  const router = useRouter()
  const { slug } = router.query
  useEffect(() => {
    if (slug) {
      setRelatedPosts(similarPosts)
    } else {
      setRelatedPosts(recentPosts)
    }
  }, [slug, recentPosts, similarPosts])

  return (
    <div className=' bg-white shadow-lg rounded-lg p-8 mb-8 flex flex-col justify-center items-center'>
      <h3 className='font-semibold border-b pb-4 mb-4 uppercase text-center w-full'>{slug ? "Similar Posts" : "Related Posts"}</h3>
      {relatedPosts?.map((post, index) =>
        <Link key={index} href={`/posts/${post.slug}`} className="w-full">
          <div key={index} className="flex my-4 group w-full">
            <Image src={post.featuredImage.url.toString()} alt="Post Image" width={500} height={500}
              className=" w-[60px] h-[60px] rounded-full mr-2"
            />
            <div>
              <p className=' text-sm text-gray-600'>{moment(post.updatedAt).format('DD MMM, YYYY')}</p>
              <p className='group-hover:text-red-400 tracking-wide'>{post.title}</p>
            </div>
          </div>
        </Link>


      )}
    </div>
  )
}

export default Postwidget