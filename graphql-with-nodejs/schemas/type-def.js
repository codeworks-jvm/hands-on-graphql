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
    """
    the job by this user
    """
    job: Job,
    """
    the company by this user
    """
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
  
  # this schema allows the following mutation:
  type Mutation { 
    addUser(id: String!, name: String!, age: Int, jobId: String!, companyId: String!) : User!
    updateUser(id: String!, name: String, age: Int, jobId: String, companyId: String) : User!
    deleteUser(id: String!) : Boolean  
  }
  
`;

module.exports = typeDefs;
