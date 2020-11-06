const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/schema')
const server = express();

server.use(
    '/codeWorksGraphQL',
    graphqlHTTP({
    graphiql:true,
    schema
}));

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
})