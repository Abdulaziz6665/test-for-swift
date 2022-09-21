const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`

  type Foods {
    id: ID!
    name: String!
    price: Int!
    img: String
  }

  type Query {
    foods: [Foods]!
  }

  type Mutation {
    addFood(name: String!, price: Int!): Foods!
    deleteFoodByID(id: ID!): Foods!
  }

  type Subscription {
    foodAdded: Foods!
  }

`