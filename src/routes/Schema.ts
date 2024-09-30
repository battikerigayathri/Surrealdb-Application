export const typeDefs = `
type User{
id:ID!
name:String
email:String
}
  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, mobile: String, isVerified: Boolean): User
    updateUser(id: ID!, name: String, email: String, mobile: String, isVerified: Boolean): User
    deleteUser(id: ID!): String
  }
`;