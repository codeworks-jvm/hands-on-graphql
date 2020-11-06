const typeDefs = `
  
  type Company {
    id: String!
    name: String
    users: [User]
  }
  
  type Job {
    id: String!
    name: String
    users: [User]
  }
  
  type User {
    id: String!
    name: String
    age: Int
    job: Job,
    company: Company
  }
  
  # the schema allows the following query:
  type Query {
    user(id: String!): User
    users: [User] 
    job(id: Int!): Job
    jobs: [Job]
    company(id: Int!): Company
    companies: [Company] 
  }
`;

module.exports = typeDefs;
