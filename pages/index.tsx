import Head from 'next/head'
import type { NextPage, GetStaticProps } from "next"
import { PostCard, Postwidget, Categories, FeaturePosts } from "../components"
import Header from "../components/Header"
import { getAllCategories, getFeaturedPosts, getPosts, getRecentPosts} from "../services"
import { Category, FeaturedPost, Post, RecentPost } from "../typing"

const Home: NextPage<{
  posts: Post[],
  recentPosts: RecentPost[],
  featuredPosts: FeaturedPost[],
  categories:Category[]
}> = (
  {
    posts,
    recentPosts,
    featuredPosts,
    categories
  }
) => {
    return (
      <div className="container mx-auto px-2 md:px-10 mb-8">
        <Head>
          <title>TECHKE</title>
          <meta name="description" content="My Nextjs Typescript Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header categories={categories} />

        <FeaturePosts posts={featuredPosts}/>

        <main className=' grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto'>

          <section className=' col-span-1 lg:col-span-8 py-4'>
            {
              posts.map((post, index) => <PostCard key={index} post={post} />)
            }
          </section>

          <section className='col-span-1 lg:col-span-4 py-4'>
            <div className=' relative lg:sticky top-8'>
              <Postwidget recentPosts={recentPosts} similarPosts={[]} />
              <Categories categories={categories} />
            </div>
          </section>

        </main>


      </div>
    )
  }

export default Home

export const getStaticProps: GetStaticProps<{
  posts: Post[],
  recentPosts: RecentPost[],
  featuredPosts:FeaturedPost[],
  categories:Category[]
}> = async () => {
  const posts = await getPosts()
  const recentPosts = await getRecentPosts()
  const categories = await getAllCategories()
  const featuredPosts = await getFeaturedPosts()
  return {
    props: {
      posts,
      recentPosts,
      featuredPosts,
      categories
    },
    revalidate: 10
  }
}

