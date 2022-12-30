import React from 'react'
import Head from 'next/head'
import { Categories, Header, Postwidget, PostDetails, Author, CommentForm, Comments } from '../../components'
import { getCategoryFromSimilarPostSlug, getSimilarPosts, getAllCategories, getPosts, getAllCommentsFromSlug } from "../../services"
import { Category, RecentPost, Post as PostType, CommentType } from "../../typing"
import type { NextPage, GetStaticProps, GetStaticPaths } from "next"

const Post: NextPage<{
  similarPosts: RecentPost[] | [],
  categories: Category[],
  comments: CommentType[],
  post: PostType
}> = ({
  similarPosts,
  categories,
  comments,
  post,
}) => {
    return (
      <div className="container mx-auto lg:px-10 mb-8">
        <Head>
          <title>{post.node.title}</title>
          <meta name="description" content={post.node.excerpt.toString()} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header categories={categories} />
        <main className=' grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto'>

          <section className=' col-span-1 lg:col-span-8 py-4'>
            <PostDetails post={post} />
            <Author post={post} />
            <Comments comments={comments} />
            <CommentForm slug={post.node.slug} />
          </section>

          <section className='col-span-1 lg:col-span-4 py-4'>
            <Postwidget similarPosts={similarPosts} recentPosts={[]} />
            <Categories categories={categories} />
          </section>

        </main>

      </div>
    )
  }

export default Post


export const getStaticPaths: GetStaticPaths = async () => {
  const posts: PostType[] = await getPosts()
  const paths = posts.map(post => {
    return (
      {
        params: {
          slug: post.node.slug.toString()
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
  similarPosts: RecentPost[] | [],
  categories: Category[],
  comments: CommentType[],
  post?: PostType
}> = async (context) => {
  if (typeof (context?.params?.slug) === "undefined") {
    throw new Error("undefined slug")
  } else {
    const posts = await getPosts()
    const slugList = posts.map(post => post.node.slug)
    const slug = slugList.find(val => val === context?.params?.slug)
    if (typeof (slug) === "undefined") {
      return {
        notFound: true
      }
    }
    const category = await getCategoryFromSimilarPostSlug(slug)
    const similarPosts = await getSimilarPosts(slug, [category])
    const comments = await getAllCommentsFromSlug(slug)
    const categories = await getAllCategories()
    const post = posts.find(post => post.node.slug === slug)
    return {
      props: {
        similarPosts,
        categories,
        comments,
        post
      },
      revalidate: 10
    }
  }

}

