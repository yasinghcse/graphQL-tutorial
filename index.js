const {ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
    typeDefs, resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        return server.listen({ port: 5000});
    })
    .then(res => console.log(`Server started at ${res.url}`));