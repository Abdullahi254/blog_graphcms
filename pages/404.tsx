import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const Custom404 = (props: Props) => {
    const router = useRouter()
    const {slug} = router.query
  return (
    <div className=' h-screen w-full flex flex-col justify-center items-center'>
         <h1 className='text-white text-sm tracking-wide'><span className=' text-2xl'>404 | </span>This page could not be found.</h1>
    </div>
  )
}

export default Custom404