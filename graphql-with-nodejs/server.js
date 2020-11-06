const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const server = express();

server.use(
    '/codeWorksGraphQL',
    graphqlHTTP({
    graphiql:true
}));

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
})