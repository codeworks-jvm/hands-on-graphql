# hands-on-graphql with Node JS


# Initialisation du projet 

- Création du repertoire du projet
`mkdir graphql-with-nodejs && cd graphql-with-nodejs`

- Initialisation du projet et installation des packages utiles 
`npm init`
`npm install express express-graphql graphql graphql-tools axios lodash --save`

 - Initialisation du server express
  ```javascript 
  const express = require('express');
  const server = express();
  server.listen(8080, () => {
     console.log('Server is listening on port 8080');
  });
 ```

 - Montez simplement express-graphql comme route handler 
  ```javascript 
   const { graphqlHTTP } = require('express-graphql');
   server.use("/codeWorksGraphQL", graphqlHTTP({
       graphiql:true
   }));
   ```  
   Ce montage nous permet d'invoquer notre server GraphQL via cette url `http://localhost:8080/codeWorksGraphQL`
   Mais pour le moment on aura ce message d'erreur   `{"errors":[{"message":"GraphQL middleware options must contain a schema."}]}` 
   de la part du middleware parce qu'on a pas encore de schema. 
   
 - Exécution du projet 
   - `json-server --watch db.json` charger notre data store avec les données de db.json
   - `node server` ou `nodemon server`
   
   
# Création de schemas et types de GraphQL

   `mkdir schema && cd schema`

 - Création de definition de type
 
   `vim type-def.js`

 ```javascript 
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
  ```

- Création de Query
 ```javascript 
 # the schema allows the following query:
   type Query {
     user(id: String!): User
     users: [User] 
     job(id: Int!): Job
     jobs: [Job]
     company(id: Int!): Company
     companies: [Company] 
   }
  ```

 - Création du premier schema 
   `vim schema.js`
      
  ```javascript 
  const typeDefs = require("./type-def");
  const axios = require("axios");
  const { makeExecutableSchema } = require('graphql-tools');
  const api = 'http://localhost:3000';
  
  const resolvers = {
      Query: {
          users: () => axios.get(api +'/users')
              .then((response) => response.data),
          user: (_, { id }) => axios.get(api+ `/users/${id}`)
              .then((response) => response.data),
  
          jobs: () => axios.get(api +'/jobs')
              .then((response) => response.data),
          job:(_, { id }) => axios.get(api+ `/jobs/${id}`)
              .then((response) => response.data),
  
          companies: () => axios.get(api +'/companies')
              .then((response) => response.data),
          company:(_, { id }) => axios.get(api+ `/companies/${id}`)
              .then((response) => response.data),
      }
  };
  
  const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
  });
  module.exports = schema;
  ``` 
  
  - Requête imbriquée
  On ajoute les resolvers de job et company au type User dans le sechema
  
  ```javascript 
  User: {
          job: (user) => axios.get(api+ `/jobs/${user.jobId}`)
                  .then((response) => response.data),
          company: (user) => axios.get(api+ `/companies/${user.companyId}`)
              .then((response) => response.data)
      } 
 ``` 
   
 Cela nous permet de récupérer un utilisateur avec son job ou company si on le souhaite 
 
 ```graphQL 
 query{
   user(id: "1"){
     id
     name
     age
     job {                          
       name
     }
     company{
       name
     }
   }
 }     
 ``` 
 
 - Requête bidirectionnelle
   On ajoute le resolver des utilisateurs dans les types Job et Company dans le schema pour pouvoir récupérer 
   les users d'un job ou d'une compagnie. 
  
  ```javascript  
    Job: {
            users: (job) => axios.get(api+ `/jobs/${job.id}/users`)
                .then((response) => response.data)
        },
    
    Company: {
          users: (company) => axios.get(api+ `/companies/${company.id}/users`)
                .then((response) => response.data),
    }
 ``` 
     
 - Création des Mutations
 On ajoute dans la definition de type notre mutation (type-def.js)
 ```javascript 
  # this schema allows the following mutation:
   type Mutation { 
     addUser(id: String!, name: String!, age: Int, jobId: String!, companyId: String!) : User!
     updateUser(id: String!, name: String, age: Int, jobId: String, companyId: String) : User!
     deleteUser(id: String!) : Boolean  
   }
  ```

  Après on ajoute ces resolvers dans le schema (./schemas/schema.js) 

  ```javascript 
  Mutation: {
             addUser: (_, { id, name, age, jobId, companyId }) => {
                 return axios.post(api +'/users',
                     {id: id, name: name, age: age, jobId: jobId, companyId: companyId })
                     .then((response) => response.data);
             },
             updateUser: (_, { id, name, age, jobId, companyId }) => {
                    return axios.put(api +`/users/${id}`,
                        {id: id, name: name, age: age, jobId: jobId, companyId: companyId })
                        .then((response) => response.data);
             },
            deleteUser: (_, { id })  =>
                axios.delete(api +`/users/${id}`).then((response) => true)
        }
  ```
  
  Exemple de mutation :
  
  ```graphQL
  mutation{
    updateUser(id: "5", name: "Bkake", age: 75, jobId: "2", companyId: "2") {
      id
      name
      age
    }
  } 
  ```

Autres alternatives de création de schema, type, query et mutation sans passer par `makeExecutableSchema` de `graphql-tools` 
qui est une extension de `graphql`.
il suffit d'utiliser simplement les fonctionnalités de `graphql`. 
[voir exemple sur GitHub ](https://github.com/Bkake/react-graphql-intro)

# Client GraphQL
  - GraphiQL http://localhost:8080/codeWorksGraphQL est activé dans l'application
  - [Firecamp](https://firecamp.io/)
  - Postman
  - Clients React
    - [AppoloGraphQL](https://www.apollographql.com/)
    - [Relay](https://relay.dev/)
         