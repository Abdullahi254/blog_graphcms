import React, { useContext } from 'react'
import Link from "next/link"
import { Category } from "../typing"
import Image from 'next/image'
import logo from "../public/logo.png"
type Props = {
    categories: Category[]
}



const Header = ({ categories }: Props) => {
    return (
        <header className='flex items-center 
        justify-between max-w-7xl mx-auto z-20
        p-5 md:px-10 xl:px-5 border-b border-white pt-8 pb-3'>

            <div>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        height={500}
                        width={500}
                        className="w-[80px] h-[80px] rounded-full"
                    />
                </Link>
            </div>

            <div className=' hidden md:block'>
                {
                    categories.map((categ, index) => <Link key={index} href={`/categories/${categ.slug}`}>
                        <span className='text-white ml-4 font-semibold cursor-pointer'>
                            {categ.name}
                        </span>
                    </Link>)
                }
            </div>

        </header>
    )
}

export default Header

