import { request, gql } from "graphql-request"
import { Category, Post, RecentPost, CommentType, Comment, FeaturedPost } from "../typing"


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getPosts = async (): Promise<Post[]> => {
  const query = gql`
  query MyQuery {
    postsConnection(orderBy: createdAt_DESC) {
      edges {
        node {
          author {
            bio
            id
            name
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
          content {
            text
          }
        }
      }
    }
  }
    `

  const rawResult = await request(graphqlAPI, query)
  const result: Post[] = await rawResult.postsConnection.edges
  return result

}

export const getRecentPosts = async (): Promise<RecentPost[]> => {
  const query = gql`
    query GetPostDetails{
      posts(
        orderBy: createdAt_ASC
        last:3
        ){
          title
          featuredImage{
            url
          }
          updatedAt
          slug
        }
    }
  `
  const rawResult = await request(graphqlAPI, query)
  const result: RecentPost[] = await rawResult.posts
  return result
}

export const getFeaturedPosts = async (): Promise<FeaturedPost[]> => {
  const query = gql`
    query GetFeaturedPosts{
      posts(
        where:{featuredPost:true}
        ){
          author{
            name
            photo{
              url
            }
          }
          title
          featuredImage{
            url
          }
          updatedAt
          slug
        }
    }
  `
  const rawResult = await request(graphqlAPI, query)
  const result: FeaturedPost[] = await rawResult.posts
  return result
}


export const getSimilarPosts = async (slug: String, categories: Category[]): Promise<RecentPost[]> => {

  let variables = {
    slug,
    categories: categories
  }

  const query = gql`
    query GetPostDetails($slug:String!, $categories:[String!]){
      posts(
        where:{slug_not: $slug, AND:{categories_some:{slug_in:$categories}}}
        last:3
      )
      {
        title
        featuredImage{
          url
        }
        updatedAt
        slug
      }
    } 
  `

  const rawResult = await request(graphqlAPI, query, variables)
  const result: RecentPost[] = await rawResult.posts
  return result
}

export const getPostsFromCategorySlug = async (slug: String):Promise<RecentPost[]> => {
  let variables = {
    slug
  }
  const query = gql`
  query PostsFromCategorySlug($slug:String!) {
    posts(where: {categories_some: {slug: $slug}}) {
      title
        featuredImage{
          url
        }
        updatedAt
        slug
    }
  }
  `
  const rawResult = await request(graphqlAPI, query, variables)
  const result: RecentPost[] = await rawResult.posts
  return result
}

export const getCategoryFromSimilarPostSlug = async (slug: String): Promise<Category> => {
  const query = gql`
    query getCategoryFromSimilarPostSlug($list:[String!]) {
      categories(where: {post_some: {slug_in: $list}}) {
        slug
      }
    }
  `
  const rawResult = await request(graphqlAPI, query, { list: [slug] })
  const category: Category = await rawResult.categories[0].slug
  return category
}

export const getAllCategories = async (): Promise<Category[]> => {
  const query = gql`
    query BlogCategories {
      categories {
        name
        slug
      }
    }
  `

  const rawResult = await request(graphqlAPI, query)
  const result: Category[] = await rawResult.categories
  return result
}

export const getAllCommentsFromSlug = async (slug: String): Promise<CommentType[]> => {
  const query = gql`
    query GetCommentsFromSlug($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        comment
        createdAt
      }
    }
  `
  const rawResult = await request(graphqlAPI, query, { slug })
  const comments: CommentType[] = await rawResult.comments
  return comments
}

export const submitComment = async (obj: Comment) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
  return result.json()
}
