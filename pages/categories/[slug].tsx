import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getAllCategories, getPostsFromCategorySlug } from '../../services'
import { Category as CategoryType, RecentPost, } from '../../typing'
import type { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { Header } from '../../components'
import { useRouter } from 'next/router'


const Category: NextPage<{
    posts: RecentPost[],
    categories: CategoryType[]
}> = ({
    posts,
    categories
}) => {
        const router = useRouter()
        const { slug } = router.query
        return (
            <div className='container mx-auto px-10 mb-8'>
                <Head>
                    <title>{slug}</title>
                    <meta name="description" content="List of posts from a category"/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header categories={categories} />
                <div className='max-w-5xl mx-auto bg-white p-6 mt-[50px] rounded-lg shadow-md'>
                    <h3 className=' text-lg font-semibold text-center mb-6 uppercase'>{slug}</h3>
                    {
                        posts.map((post, index) =>
                            <div key={index} className="border-b-2 mb-2 p-4 text-center">
                                <Link href={`/posts/${post.slug}`}>
                                    <span className=' cursor-pointer hover:text-red-400'>
                                        {post.title}
                                    </span>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
    const categories: CategoryType[] = await getAllCategories()
    const paths = categories.map(category => {
        return (
            {
                params: {
                    slug: category.slug.toString()
                }
            }
        )
    })
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<{
    posts: RecentPost[],
    categories: CategoryType[]
}> = async (context) => {
    if (typeof (context?.params?.slug) === "undefined") {
        return {
            notFound: true
        }
    }
    const slug = context?.params?.slug
    const categories = await getAllCategories()
    const posts = await getPostsFromCategorySlug(slug as String)
    return {
        props: {
            posts,
            categories
        },
        revalidate: 10
    }


}