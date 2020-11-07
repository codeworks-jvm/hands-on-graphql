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
    },

    User: {
        job: (user) => axios.get(api+ `/jobs/${user.jobId}`)
                .then((response) => response.data),
        company: (user) => axios.get(api+ `/companies/${user.companyId}`)
            .then((response) => response.data)
    }
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;