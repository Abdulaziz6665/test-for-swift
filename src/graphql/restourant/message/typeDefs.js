const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`

  type Message {
    user_id: Int!
    message_id: Int!
    message: String!
    name: String!
  }

  type User {
    id: Int!
    name: String!
  }

  type Query {
    messages: [Message]!
  }
  
  extend type Mutation {
    signUp(userName: String!, password: String!): User!
    login(userName: String!, password: String!): User!
    deleteUserByID(id: Int!): User!
    writeMessage(message: String! userID: Int!): String!
    deleteMessageById(id: Int!): Message!
  }

  type Subscription {
    newMessage: Message!
  }

`