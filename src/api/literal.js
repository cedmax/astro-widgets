import { gql, GraphQLClient, request } from "graphql-request"

const endpoint = `https://literal.club/graphql/`
const env = import.meta.env

let token, profileId
try {
  const {
    login: {
      token: tmpToken,
      profile: { id },
    },
  } = await request(
    endpoint,
    gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          profile {
            id
          }
        }
      }
    `,
    {
      email: env.LITERALCLUB_EMAIL,
      password: env.LITERALCLUB_PWD,
    },
  )

  token = tmpToken
  profileId = id
} catch (e) {}

export default class Literal {
  constructor() {
    if (!env.LITERALCLUB_EMAIL || !env.LITERALCLUB_PWD) {
      throw new Error(
        "Literal.club email and password are needed for this widget",
      )
    }

    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  #query = gql`
    query booksByReadingStateAndProfile(
      $limit: Int!
      $offset: Int!
      $profileId: String!
      $readingStatus: ReadingStatus! # find fragments below
    ) {
      booksByReadingStateAndProfile(
        limit: $limit
        profileId: $profileId
        offset: $offset
        readingStatus: $readingStatus
      ) {
        id
        slug
        title
        subtitle
        description
        isbn10
        isbn13
        language
        pageCount
        publishedDate
        publisher
        cover
        authors {
          id
          name
        }
        gradientColors
      }
    }
  `

  async fetch() {
    const data = await this.graphQLClient.request(this.#query, {
      limit: 1,
      profileId,
      offset: 0,
      readingStatus: "IS_READING",
    })

    return data.booksByReadingStateAndProfile?.[0]
  }
}
