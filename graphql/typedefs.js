
const { gql } = require("apollo-server");

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }

    type Query {
        getPosts: [Post]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
    }
`;