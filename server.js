const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

// Schema
const schema = buildSchema(``)
// Resolvers
const root = {}

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => console.log('Express graphQL server running at http://localhost:4000/graphql.'))