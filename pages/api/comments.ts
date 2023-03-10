// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
      }
    })
    const query = gql`
    mutation CreateComment($name:String!, $email:String!, $comment:String!, $slug:String!){
      createComment(data:{name:$name, email:$email, comment:$comment, post:{connect:{slug:$slug}}}){id}
    }
  `
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (er) {
    console.log(er)
    return res.status(500).send(er as Data )
  }

}
