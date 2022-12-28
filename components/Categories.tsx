import React from 'react'
import { Category } from '../typing'
import Link from 'next/link'

type Props = {
  categories: Category[]
}

const Categories = ({ categories }: Props) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 flex flex-col justify-center items-center'>
      <h3 className='font-semibold border-b w-full pb-4 mb-4 uppercase text-center'>Categories</h3>
      <ul className=' list-none w-full text-center'>
        {
          categories.map((category, index) =>
            <Link href={`/categories/${category.slug}`} key={index}>
              <li className=" tracking-wider py-4 border-b hover:text-red-400">
                {category.name}
              </li>
            </Link>
          )
        }
      </ul>
    </div>
  )
}

export default Categories
